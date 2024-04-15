import React from 'react'
import { Form, Input, Button, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import './login.css'
import iconImage from '../../../static/icon.png'

interface CLoginProps {
  open: boolean;
  onClose: () => void;
  onLogIn: () => void;
}

const CLogin: React.FC<CLoginProps> = ({ open,onClose,onLogIn }) => {

  const onLogin = (values: { username: string; password: string; rememberMe: boolean }): void => {
    const { username, password, rememberMe } = values
    localStorage.setItem('userName', username);
    console.log('Logging in with:', { username, password, rememberMe })
    onLogIn();
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={360} className='logInModal'>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onLogin}
      >
        <img src={iconImage} alt="Logo" className="logo"></img>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入您的用户名!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        {/* <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入您的密码!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item> */}
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="login-form-text">记住我</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码
          </a>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          {/* <a href="">现在注册！</a> */}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CLogin
