import React from 'react'
import { Card,Divider,Table } from "antd";
import { ColumnType } from 'antd/lib/table';
import './CAnalytics.css'

const CCAnalytics: React.FC = () => {
    type BcAnalytics = {
        [category: string]: {
          [player: string]: number;
        };
      };
    const tot=21;
    const bcAnalytics:BcAnalytics = {
        '冠军':{
            '大kk': 5,
            '[26]似水流年': 5,
            '[25]花滑女王水痘': 10,
            '数字南':1,
        },
        '上半区获胜者':{
            '大kk': 11,
            '[26]似水流年': 10,
        },
        '下半区获胜者':{
            '[25]花滑女王水痘': 20,
            '数字南':1,
        },
    };

    // const generateTables = () => {
         const Tables = []
        for(const key in bcAnalytics) {
            const dataSource = Object.entries(bcAnalytics[key]).map(([innerKey, value]) => ({
                key: innerKey,
                value: value,
                prop: ((+(value/tot*100).toFixed(2)) + '%'),
              }));
            console.log(dataSource)
            dataSource.sort((a,b)=>b.value-a.value)
            const columns: ColumnType<{ key: string; value: number; prop: string; }>[] = [
                {
                  title: '选手',
                  dataIndex: 'key'
                },
                {
                  title: '数量',
                  dataIndex: 'value',
                },
                {
                    title: '比例',
                    dataIndex: 'prop'               
                }
              ];
        
              Tables.push(
                <div key={key} className='ana-table'>
                  <h2>{key}</h2>
                  <Table dataSource={dataSource} columns={columns} pagination={false} bordered={true} showSorterTooltip={false}/>
                </div>
              );
        }
        console.log(Tables)
    // }
    return (
        <div>
            <Card className='card-continer'>
                <h2>预测统计 （共{tot}人作答）</h2>   
                <Divider/>
                <div className='table-container'>
                    {Tables}
                </div>
            </Card>
        </div>
    )
}

export default CCAnalytics