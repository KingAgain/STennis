import React from "react";
import { Card,Divider,Table,Button } from "antd";
import { useNavigate } from 'react-router-dom'
import './CRank.css'
const CRank: React.FC = () => {
    const bcRank = [
        { "rank": 1, "username": "大kk", "score": 10, "matches": 8 },
        { "rank": 2, "username": "数字南", "score": 8, "matches": 7 },
        { "rank": 3, "username": "花滑女王水痘", "score": 6, "matches": 9 },
      ]
      const columns = [
        {title: '排名',dataIndex: 'rank',key: 'rank',},
        {title: '用户名',dataIndex: 'username',key: 'username',},
        {title: '分数',dataIndex: 'score',key: 'score',},
        {title: '场次',dataIndex: 'matches',key: 'matches',},
      ];
    const navigator = useNavigate()
    const navigateToParent = () => {
        const currentHashPath = window.location.hash;
        const currentPath = currentHashPath.replace(/^#/, '');
        const segments = currentPath.split('/').filter(segment => segment !== '');
        const newHashPath = segments.slice(0, -1).join('/');
        console.log(newHashPath);
        navigator(newHashPath);
    };
    bcRank.sort((a,b)=>a.rank-b.rank)
    const bcTable = <Table dataSource={bcRank} columns={columns}  pagination={false} bordered={true} showSorterTooltip={false}/>;
    return (
        <div>
            <Card className='card-container'>
                <h2 style={{ display: 'inline' }}>预测排行榜</h2>
                <Button type='link' onClick={navigateToParent}>
                  返回
                </Button>
                <Divider/>
                <div>
                    {bcTable}
                </div>
            </Card>
        </div>
    )
};

export default CRank;