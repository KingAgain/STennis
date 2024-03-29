import React from 'react'
import { useState, useEffect } from 'react';
import { Button, message, Tooltip, Modal, Card } from 'antd'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

interface myProps {
    buttonNames: string[][],
    isDisabled: boolean,
}
const CCUserInfo: React.FC<myProps> = (props:myProps) => {
    const [modal, modalContextHolder] = Modal.useModal();
    const [messageApi, contextHolder] = message.useMessage();
    const navigator = useNavigate()

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
  
    const sendAnswerToServer = async (data: string) => {
      try {
        console.log(data)
        const response = await axios.post('http://localhost:3000/api/submitAnswer', data, {
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
        if (error == 'AxiosError: Request failed with status code 409') {
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
    const handleSubmit = () => {
        const answerData: { [key: string]: string[] | string } = {};
        answerData[`userName`] = localStorage.getItem('userName') as string;
        for (let round = 0; round < props.buttonNames.length; round++) {
          if (props.buttonNames[round].includes('')) {
            messageApi.open({
              type: 'error',
              content: '未完成',
            });
            return;
          }
          answerData[`round${round + 1}`] = props.buttonNames[round];
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

    const navigateToA = () => {
    const currentHashPath = window.location.hash;
    const currentPath = currentHashPath.replace(/^#/, '');
    const newPath = `${currentPath}/analytics`;
    console.log(currentPath)
    navigator(newPath);
    }

    return(
        <div>
            {contextHolder}
            <Card className='card-continer'>
                <Tooltip title={(isLoggedIn ? '' : ' 请先登录 ') + (props.isDisabled ? '已超过提交时间' : '')}>
                <span>
                    <Button type="primary" disabled={!isLoggedIn || props.isDisabled} onClick={handleSubmit} className='toolButton' >
                    提交
                    </Button>
                </span>
                </Tooltip>
                <span className='exTimeHint'>
                截止时间 | 2024年3月25日23:00
                </span>
                <Button type='link' onClick={navigateToA}>
                点击查看预测统计
                </Button>
            </Card>
            {modalContextHolder}
        </div>
    )
}

export default CCUserInfo