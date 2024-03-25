import React from 'react'
import { useState, useEffect } from 'react';
import '../../css/bc_styles.css'
import { Button, message, Tooltip, Modal, Card,Divider } from 'antd'
import axios from 'axios';

const PBc: React.FC = () => {
  console.log(new Date());
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    const handleLoginChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };
    window.addEventListener('loginChange', handleLoginChange);
    return () => {
      window.removeEventListener('loginChange', handleLoginChange);
    };
  }, []);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const disableTime = new Date('2024-03-25T23:00:00+08:00')
      if (currentTime >= disableTime) {
        setIsExpired(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  });


  const sendAnswerToServer = async (data: string) => {
    try {
      console.log(data)
      const response = await axios.post('http://localhost:3000/api/submitAnswer', data,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Server response:', response.data);
      messageApi.open({
        type: 'success',
        content: '已提交',
      });
    } catch (error) {
      if(error == 'AxiosError: Request failed with status code 409'){
        messageApi.open({
          type: 'error',
          content: '该用户已提交过一次',
        });
        return;
      }
      messageApi.open({
        type: 'error',
        content: `${error}`,
      });
      console.error('Error:', error);
    }
  };

  const buttonsData = ['十六强','1/8区', '2/8区', '3/8区', '4/8区', '5/8区', '6/8区', '7/8区', '8/8区'];
  const initialNames = [[''], [], [], [], []];
  const [selectedButton, setSelectedButton] = useState<string | null>(buttonsData[0]);
  const handleZoneButtonClick = (label: string) => {
    setSelectedButton(label);
  };

  //get the initial names from the server(TBD)
  const drawSize = 16;
  const totRound = Math.log2(16);
  initialNames[0] = ['[26]似水流年', '特别大兔子', '[20]空白格', '[Q]里奥在普鲁托', '三木四水', '[23]大嘴丽丽', '[19]大kk', '[6]你是我的小馨蕴', '[28]爱阳86', '[Q]苍风一目连', '[17]安德莱斯库', '[25]花滑女王水痘', '[7]日海岸', '萤散野风秋', '数字南', '[WC]香菜烧红鱼'];
  for (let colSize = drawSize / 2, round = 1; colSize >= 1; colSize /= 2, round++) {
    for (let col = 0; col < colSize; col++) {
      initialNames[round].push('');
    }
  }

  const [buttonNames, setButtonNames] = useState<string[][]>(initialNames);
  const handleDrawClick = (round: number, row: number) => {
    const currentName = buttonNames[round][row];
    if(buttonNames[round + 1][Math.floor(row / 2)] != ''){
      handleDrawChange(round + 1,Math.floor(row / 2),currentName)
      return;
    }
    const newButtonNames = [...buttonNames];
    newButtonNames[round + 1][Math.floor(row / 2)] = currentName;
    setButtonNames(newButtonNames);
  };
  const handleDrawChange = (round: number, row: number,player : string) => {
    const oringinName = buttonNames[round][row];
    if(round<totRound){
      if(buttonNames[round + 1][Math.floor(row / 2)] == oringinName){
        handleDrawChange(round + 1,Math.floor(row / 2),player)
      }
    }
    console.log(round,row,player)
    const newButtonNames = [...buttonNames];
    newButtonNames[round][row] = player;
    setButtonNames(newButtonNames);    
  }
  const generateButtons = (drawPos: number) => {
    const buttons = [];
    let colSize = drawSize / 8;
    let initSize = 1;
    if (drawPos == 0){
      if(drawSize == 16){
        colSize = 16;
        initSize = 16;
      }
      else{
        colSize = 8;
        initSize = 8;
      }
    }
    for (let round = 0; colSize >= 1; round++) {
      const roundButtons = [];
      for (let row = 0; row < colSize; row++) {
        if (drawPos != 0) {
          const totRow = row + colSize * (drawPos - 1);
          if (colSize == 1) {
            roundButtons.push(
              <Button
                className='drawButton'
                disabled={(buttonNames[round][totRow]=='BYE')}
              >
                {buttonNames[round][totRow]}
              </Button>
            );
          }
          else {
            roundButtons.push(
              <Button
                onClick={() => handleDrawClick(round, totRow)}
                className='drawButton'
                disabled={(buttonNames[round][totRow]=='BYE')}
              >
                {buttonNames[round][totRow]}
              </Button>
            );
          }
        }
        else {
          const totRound = Math.log2(drawSize / initSize) + round;
          roundButtons.push(
            <Button
              onClick={() => handleDrawClick(totRound, row)}
              disabled={(buttonNames[totRound][row]==='BYE')}
              className='drawButton'
            >
              {buttonNames[totRound][row]}
            </Button>
          );
        }
      }
      buttons.push(
        <div key={round} className='drawRound' data-round={round + 1}>
          {roundButtons}
        </div>
      );
      colSize /= 2;
    }
    return buttons;
  };

  const handleSubmit = () => {
    const answerData: { [key: string]: string[] | string } = {};
    answerData[`userName`] = localStorage.getItem('userName') as string;
    for (let round = 0; round < buttonNames.length; round++) {
      if (buttonNames[round].includes('')) {
        messageApi.open({
          type: 'error',
          content: '未完成',
        });
        return;
      }
      answerData[`round${round + 1}`] = buttonNames[round];
    }
    let confirmed = false;
    (async () => {
      confirmed = await modal.confirm({
        title: '一经提交无法更改！确认提交？',
      });
      if (confirmed) {
        const answerJSON = JSON.stringify(answerData);
        sendAnswerToServer(answerJSON);
      }
    })()
  }
  const contentMap: { [key: string]: React.ReactNode } = {
    '1/8区': <div className='drawParent'>{generateButtons(1)}</div>,
    '2/8区': <div className='drawParent'>{generateButtons(2)}</div>,
    '3/8区': <div className='drawParent'>{generateButtons(3)}</div>,
    '4/8区': <div className='drawParent'>{generateButtons(4)}</div>,
    '5/8区': <div className='drawParent'>{generateButtons(5)}</div>,
    '6/8区': <div className='drawParent'>{generateButtons(6)}</div>,
    '7/8区': <div className='drawParent'>{generateButtons(7)}</div>,
    '8/8区': <div className='drawParent'>{generateButtons(8)}</div>,
    '八强': <div className='drawParent'>{generateButtons(0)}</div>,
    '十六强': <div className='drawParent'>{generateButtons(0)}</div>,
  };

  return (
    <div className='bc'>
      {contextHolder}
      <Card className='card-continer'>
        <h1>PK赛迈阿密签表挑战</h1>
        <Tooltip title={(isLoggedIn ? '' : ' 请先登录 ') + (isExpired ? '已超过提交时间' : '')}>
          <span>
            <Button type="primary" disabled={!isLoggedIn||isExpired} onClick={handleSubmit} className='toolButton'>
              提交
            </Button>
          </span>
        </Tooltip>
        <span className='exTimeHint'>
          截止时间：2024年3月25日23:00
        </span>
      </Card>
      <Card className='card-continer'>
      <div className="button-container">
        {buttonsData.map((label) => (
          <Button
            key={label}
            onClick={() => handleZoneButtonClick(label)}
            type={selectedButton === label ? 'primary' : 'default'}
            style={{ marginRight: '10px' }}
            className='toolButton'
          >
            {label}
          </Button>

        ))}
      </div>
      <Divider />
      <div style={{ display: selectedButton === null ? 'none' : 'block' }}>
        {contentMap[selectedButton || ''] || <div>请选择一个区域</div>}
      </div>
      </Card>
      {modalContextHolder}
    </div>
  )
}

export default PBc
