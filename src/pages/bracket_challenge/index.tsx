import React from 'react'
import './bracket_challenge.css'
import { Card } from 'antd'
import { Outlet } from "react-router-dom";

const PBc: React.FC = () => {
  return (
    <div className='bc'>
      <Card className='card-container'>
        <h1>PK赛马德里签表挑战</h1>
      </Card>
      <Outlet />
    </div>
  )
}

export default PBc
