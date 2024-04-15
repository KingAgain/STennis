import React from 'react'
import { useState, useEffect, MouseEventHandler } from 'react';
import { Button, message, Modal, Card } from 'antd'
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
        const response = await axios.post('http://localhost:8080/submitAnswer', data, {
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
        const answerData: string[][] = [];
        
        for (let round = 0; round < props.buttonNames.length; round++) {
          if (props.buttonNames[round].includes('')) {
            messageApi.open({
              type: 'error',
              content: '未完成',
            });
            return;
          }
          answerData.push(props.buttonNames[round]);
    }
    let confirmed = false;
    (async () => {
        confirmed = await modal.confirm({
        title: '一经提交无法更改！确认提交？',
        });
        if (confirmed) {
          const answerJSON = JSON.stringify(answerData);
          const answerSubmit: { [key: string]: string[][] | string} = {};
          answerSubmit[`userName`] = localStorage.getItem('userName') as string;
          answerSubmit[`answer`] = answerData;
          sendAnswerToServer(answerJSON);
        }
    })()
    }

    const navigateToPath: MouseEventHandler<HTMLElement> = (event) => {
      event.preventDefault();
      const path = event.currentTarget.getAttribute('data-path') || '/';
      const currentHashPath = window.location.hash;
      const currentPath = currentHashPath.replace(/^#/, '');
      const newPath = `${currentPath}${path}`;
      console.log(currentPath);
      navigator(newPath);
    };

    return(
        <div>
            {contextHolder}
            <Card className='card-container'>
                {!props.isDisabled ?
                  <span>
                    <Button type="primary" disabled={!isLoggedIn || props.isDisabled} onClick={handleSubmit} className='toolButton' >
                      {isLoggedIn ? '提交' : '未登录'}
                    </Button>
                    <span className='text-container-primary'> 截止时间 </span>
                    <span className='text-container-default'> 2024年3月25日23:00 </span>
                  </span> :
                  <span>
                    <span className='text-container-primary'>昵称</span>
                    <span className='text-container-default'> {localStorage.getItem('userName')}</span>
                    <span className='text-container-primary'>得分</span>
                    <span className='text-container-default'> 100</span>
                    <span className='text-container-primary'>场次</span>
                    <span className='text-container-default'> 100</span>  
                    <span className='text-container-primary'>排名</span>
                    <span className='text-container-default'> 100</span>   
                    <Button type='link' onClick={navigateToPath} data-path='/rank'>
                      点击查看排行榜
                    </Button>                   
                  </span>
                }
                <Button type='link' onClick={navigateToPath} data-path='/analytics'>
                  点击查看预测统计
                </Button>
            </Card>
            {modalContextHolder}
        </div>
    )
}

export default CCUserInfo