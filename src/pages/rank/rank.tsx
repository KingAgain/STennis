import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import { useLocation } from 'react-router-dom';
import CRank from '../../components/Rank/Rank'
import './rank.css'

const PRank: React.FC = () => {
    interface kvs {
        [key: string]: string;
    }
    
    const translate: kvs = {
        'syear': '单打世界排名',
        'dyear': '双打世界排名',
        'srace': '单打冠军排名',
        'drace': '双打冠军排名',
        'stats': '统计数据'
    };
    const location = useLocation();
    const path = window.location.hash;
    const parts = path.split('/');
    const [type, setType] = useState<string>(parts[parts.length - 1]);
    useEffect(()=>{
        const path = window.location.hash;
        const parts = path.split('/');
        setType(parts[parts.length - 1]);
    }, [location])
    return (
        <div className='rank'>  
            <Card className='card-container'>
                <h1>{translate[type]}</h1>
            </Card>
            <CRank type={type}/>
        </div>
    )
}

export default PRank