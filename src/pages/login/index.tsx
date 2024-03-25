import React, { useEffect } from 'react'
import CLogin from '../../components/login/login'
import { useLocation } from 'react-router-dom'
import '../../css/login_styles.css'
import '../../css/styles.css'

const PLogin: React.FC = () => {
  const location = useLocation()
  const currentPage = location.pathname
  useEffect(() => {
    document.body.style.all = 'initial'
    return () => {
      document.body.style.all = ''
    }
  }, [])
  return (
    <div className={`${currentPage === '/login' ? 'login-page' : ''}`}>
      <CLogin />
    </div>
  )
}

export default PLogin
