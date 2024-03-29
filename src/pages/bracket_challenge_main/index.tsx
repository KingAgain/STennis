import React from 'react'
import { useState, useEffect } from 'react';
import CCUserInfo from "../../components/CUserInfo/CUserInfo";
import CCBracket from '../../components/CBracket/CBracket'

const PBcM: React.FC = () => {

  const [status, setStatus] = useState(new Date() >= (new Date('2024-03-25T23:00:00+08:00')));
  const disableTime = new Date('2024-03-25T23:00:00+08:00')
  useEffect(() => {
      const timer = setInterval(() => {
        const currentTime = new Date();
        if (currentTime >= disableTime) {
          setStatus(true);
          clearInterval(timer);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    });
  //get the initial draw from the server(TBD)
  const drawSize = 16;
  const initialNames = [[''], [], [], [], []];
  initialNames[0] = ['[26]似水流年', '特别大兔子', '[20]空白格', '[Q]里奥在普鲁托', '三木四水', '[23]大嘴丽丽', '[19]大kk', '[6]你是我的小馨蕴', '[28]爱阳86', '[Q]苍风一目连', '[17]安德莱斯库', '[25]花滑女王水痘', '[7]日海岸', '萤散野风秋', '数字南', '[WC]香菜烧红鱼'];
  for (let colSize = drawSize / 2, round = 1; colSize >= 1; colSize /= 2, round++) {
    for (let col = 0; col < colSize; col++) {
      initialNames[round].push('');
    }
  }

  const [names, setNames] = useState<string[][]>(initialNames);
  //const getAnswerFromServer
  const userAnswer: string[][] = [];
  const correctAnswer: string[][] = [];
  const answerStatus: number[][] = [];
  if (status) {
    const userAnswerJ: { [key: string]: Array<string> | string } = {
      "userName": "数字南",
      "round1": ["红妈天后", "黄瓜妞妞", "羊肉圆圆", "红星时尚", "南丫丫", "王者归来", "让让", "大kk", "红妈天后", "黄瓜妞妞", "羊肉圆圆", "红星时尚", "南丫丫", "王者归来", "让让", "大kk"],
      "round2": ["红妈天后", "羊肉圆圆", "南丫丫", "让让", "红妈天后", "羊肉圆圆", "南丫丫", "让让"],
      "round3": ["红妈天后", "南丫丫", "红妈天后", "南丫丫"],
      "round4": ["红妈天后", "南丫丫"],
      "round5": ["南丫丫"]
    }
    const correctAnswerJ: { [key: string]: Array<string> | string } = {
      "round1": ["红妈天后", "黄瓜妞妞", "羊肉圆圆", "红星时尚", "南丫丫", "王者归来", "让让", "大kk", "红妈天后", "黄瓜妞妞", "羊肉圆圆", "红星时尚", "南丫丫", "王者归来", "让让", "大kk"],
      "round2": ["红妈天后", "红星时尚", "南丫丫", "让让", "红妈天后", "羊肉圆圆", "南丫丫", "让让"],
      "round3": ["红星时尚", "", "红妈天后", "南丫丫"],
      "round4": ["", "南丫丫"],
      "round5": [""]
    }
    for (const key in userAnswerJ) {
      if (key == 'userName') {
        continue;
      }
      userAnswer.push(userAnswerJ[key] as string[]);
    }
    for (const key in correctAnswerJ) {
      correctAnswer.push(correctAnswerJ[key] as string[]);
    }

    for (let i = 0; i < userAnswer.length; i++) {
      answerStatus.push([]);
      for (let j = 0; j < userAnswer[i].length; j++) {
        if (userAnswer[i][j] == correctAnswer[i][j]) {
          answerStatus[i][j] = 1;
        }
        else if (correctAnswer[i][j] == '') {
          if ((answerStatus[i - 1][j * 2] == -1 && userAnswer[i][j] == userAnswer[i - 1][j * 2]) || (answerStatus[i - 1][j * 2 + 1] == -1 && userAnswer[i][j] == userAnswer[i - 1][j * 2 + 1])) {
            answerStatus[i][j] = -1;
          }
          else {
            answerStatus[i][j] = 0;
          }
        }
        else {
          answerStatus[i][j] = -1;
        }
      }
    }
  }

  const userInfoProps = {
      buttonNames: names,
      isDisabled: status,
  }
  const bracketProps = {
      buttonNames: names,
      drawSize: drawSize,
      setButtonNames: setNames,
      isDisabled: status,
      correctAnswer: correctAnswer,
      userAnswer: userAnswer,
      answerStatus: answerStatus,
  }
  return (
      <div>
          <CCUserInfo {...userInfoProps}/>
          <CCBracket {...bracketProps}/>
      </div>
  )
}

export default PBcM
