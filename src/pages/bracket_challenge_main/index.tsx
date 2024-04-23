import React from 'react'
import { useState, useEffect } from 'react';
import CCUserInfo from "../../components/CUserInfo/CUserInfo";
import CCBracket from '../../components/CBracket/CBracket'

const PBcM: React.FC = () => {

  const [status, setStatus] = useState(new Date() >= (new Date('2024-04-24T17:00:00+08:00')));
  const disableTime = new Date('2024-04-24T17:00:00+08:00')
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
  const drawSize = 128;
  const initialNames = [['']];
  for(let i = 1; i < drawSize; i*=2){ 
    initialNames.push([]);
  }
  initialNames[0] = ['【1】加油_郑钦文', 'BYE', 'ABCXYZ666', '韶华纸上停', '沙漠奈亚', '老张小邪', 'BYE', '【27】莎拉科维奇',
                    '【23】公言锡爵', 'BYE', '大轰趴', 'long95428', '自由人单丹娜', 'Q', 'BYE', '【16】小小de爱钊',
                    '【11】发黄地瓜', 'BYE', 'Q', '繁华荏苒日', '大漠孤烟11111', '三木四水', 'BYE', '【19】薄荷味大叔',
                    '【28】空白格', 'BYE', 'WillKris锴', 'HANTIANES', '网坛安陵容', 'Q', 'BYE', '【5】你是我的小馨蕴',
                    '【3】波斯科维奇', 'BYE', '5默大叔', 'TNT喵喵', 'Q', '爱煮饭的老猫', 'BYE', '【31】蕴外镜',
                    '【18】大kk', 'BYE', '卢浮宫的色彩', '阴婷', '砂伯洼螺夫', 'Q', 'BYE', '【15】泰勒·弗里茨',
                    '【9】只想睡觉ing', 'BYE', 'Q', 'hantuchuwa', '南北南南i', '还是洋葱', 'BYE', '【17】瓷娃娃iiii',
                    '【32】钮钴禄氏淑女薛定谔', 'BYE', 'Alisa大主人', '像个疯子', '雅兰的诱惑', '清雲渡℃', 'BYE', '【8】黑白大山',
                    '【6】科贝尔金满贯', 'BYE', '数字南', '葱姜蒜瓣sky', 'lluuyyee', 'a18373129208', 'BYE', '【30】爱阳86',
                    '【20】安室特美惠', 'BYE', 'Q', 'Q', '萤散野风秋', '我爱渣渣1', 'BYE', '【10】1小阿哥',
                    '【14】安德莱斯库', 'BYE', '好人饿饿', '陵容安渡', 'Q', '小黑黑先生', 'BYE', '【24】似水流年',
                    '【25】雨子成说', 'BYE', '里奥在普鲁托', 'xyand小宇123', '原天柿', 'Q', 'BYE', '【4】苏三该走了呀呀',
                    '【7】日海岸', 'BYE', '【WC】人文的小强', '【WC】斯特鲁姆', '萧因法', '风花雪月之强者', 'BYE', '【29】夏日乐悠悠nice',
                    '【21】ED小童鞋', 'BYE', '大嘴丽丽', '我们都爱鸡米花', 'Change琛子', '【WC】huskxjkb', 'BYE', '【12】莱巴金娜的老公',
                    '【13】顾影自怜475', 'BYE', '芍药居街花', 'Q', '张文静之歌', 'Q', 'BYE', '【22】花滑女王水痘',
                    '【26】披头散发13', 'BYE', '很老的新人', '御剑十天', '苍风一目连', '蔑夭天后', 'BYE', '【2】liujiakun1201',];
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
