import React from 'react'
import '../../css/bc_styles.css'
import { Card } from 'antd'
import { Outlet } from "react-router-dom";

const PBc: React.FC = () => {
  return (
    <div className='bc'>
      <Card className='card-continer'>
        <h1>PK赛迈阿密签表挑战</h1>
      </Card>
      <Outlet />
    </div>
  )
}

export default PBc
