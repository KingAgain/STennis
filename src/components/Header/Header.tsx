import React, { useState,CSSProperties } from 'react'
import { Button, Dropdown, Layout, MenuProps } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import iconImage from '../../../static/icon.png'
import './Header.css'
import CLogin from '../../components/login/login'

const { Header } = Layout


const CHeader: React.FC = () => {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '')
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') == 'true');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const openLog = () => {
    setIsLogOpen(true);
  };
  const closeLog = () => {
    setIsLogOpen(false);
  };
  const logIn = () => {
    setIsLoggedIn(true);
    setIsLogOpen(false);
    setUserName(localStorage.getItem('userName') || '');
    localStorage.setItem('isLoggedIn','true');
    window.dispatchEvent(new Event('loginChange'));
  };
  const logOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn','false');
    window.dispatchEvent(new Event('loginChange'));
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a>
          个人中心
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={logOut}>
          登出
        </a>
      ),
    },
  ]
  const headerStyle:CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    maxHeight: 64,
  }

  return (
    <Header style={headerStyle} className='header'>
      <img src={iconImage} alt="Logo" className="home-logo"></img>
      {!isLoggedIn ? (
        <Button type="primary" icon={<UserOutlined />} onClick={openLog}>
          登录
        </Button>
      ) : (
        <Dropdown menu={{ items }} placement="bottom">
          <Button type="default" icon={<UserOutlined />}>
            {userName}
          </Button>
        </Dropdown>
      )
      }
      <CLogin open={isLogOpen} onClose={closeLog} onLogIn={logIn} />
    </Header >
  )
}

export default CHeader
