import React from 'react'
import { useState } from 'react';
import { Button, Card, Divider, Tag } from 'antd'

interface myProps {
  buttonNames: string[][],
  drawSize: number,
  setButtonNames: React.Dispatch<React.SetStateAction<string[][]>>,
  isDisabled: boolean,
  correctAnswer: string[][],
  userAnswer: string[][],
  answerStatus: number[][]
}
const CCBracket: React.FC<myProps> = (props: myProps) => {
  console.log(props)
  const buttonsData = ['十六强', '1/8区', '2/8区', '3/8区', '4/8区', '5/8区', '6/8区', '7/8区', '8/8区'];
  const [selectedButton, setSelectedButton] = useState<string | null>(buttonsData[0]);
  const handleZoneButtonClick = (label: string) => {
    setSelectedButton(label);
  };

  const handleDrawClick = (round: number, row: number) => {
    const currentName = props.buttonNames[round][row];
    if (props.buttonNames[round + 1][Math.floor(row / 2)] != '') {
      handleDrawChange(round + 1, Math.floor(row / 2), currentName)
      return;
    }
    const newButtonNames = [...props.buttonNames];
    newButtonNames[round + 1][Math.floor(row / 2)] = currentName;
    props.setButtonNames(newButtonNames);
  };
  const handleDrawChange = (round: number, row: number, player: string) => {
    const totRound = Math.log2(props.drawSize);
    const oringinName = props.buttonNames[round][row];
    if (round < totRound) {
      if (props.buttonNames[round + 1][Math.floor(row / 2)] == oringinName) {
        handleDrawChange(round + 1, Math.floor(row / 2), player)
      }
    }
    console.log(round, row, player)
    const newButtonNames = [...props.buttonNames];
    newButtonNames[round][row] = player;
    props.setButtonNames(newButtonNames);
  }
  const generateButtons = (drawPos: number) => {
    const buttons = [];
    let colSize = props.drawSize / 8;
    let initSize = 1;
    if (drawPos == 0) {
      if (props.drawSize == 16) {
        colSize = 16;
        initSize = 16;
      }
      else {
        colSize = 8;
        initSize = 8;
      }
    }
    for (let round = 0; colSize >= 1; round++) {
      const roundButtons = [];
      for (let row = 0; row < colSize; row++) {
        let totRow = row + colSize * (drawPos - 1);
        if (drawPos == 0) {
          totRow = row;
        }
        let totRound = Math.log2(props.drawSize / initSize) + round;
        if (drawPos != 0) {
          totRound = round;
        }
        roundButtons.push(
          <Button
            className='drawButton'
            disabled={(props.buttonNames[totRound][totRow] == 'BYE' && !props.isDisabled)
              || (props.isDisabled && (props.answerStatus[totRound][totRow] == -1))}
            onClick={(colSize != 1 && !props.isDisabled)
              ? () => handleDrawClick(totRound, totRow) : undefined}
            type={props.isDisabled && props.answerStatus[totRound][totRow] == 1
              ? 'primary' : 'default'}
            icon={props.answerStatus[totRound][totRow] == -1 && props.correctAnswer[totRound][totRow] != ''
              ? <span style={{ position: 'absolute', top: '-1rem', right: 0 }}>
                <Tag color="#108ee9">{props.correctAnswer[totRound][totRow]}</Tag>
              </span>
              : undefined}
          >
            {props.isDisabled ? props.userAnswer[totRound][totRow] : props.buttonNames[totRound][totRow]}
          </Button>
        );
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
    <div>
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
    </div>
  )
}

export default CCBracket