import React from 'react'
import { PartitionOutlined, HistoryOutlined, SearchOutlined, CrownOutlined, CalendarOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Sider.css'

const { Sider } = Layout
const options: {[key:string]: (string | never)[] }= {
  '世界排名': ['单打世界排名','双打世界排名','单打冠军排名','双打冠军排名','统计数据'],
  '签表挑战': ['2024马德里'],
  '历史战绩': [],
  'H 2 H': [],
  '巡回赛历': [],
};
const sites: {[key:string]: (string | never) } = {
  '2024马德里' : '/bc/1',
  '单打世界排名' : '/rank/syear',
  '双打世界排名' : '/rank/dyear',
  '单打冠军排名' : '/rank/srace',
  '双打冠军排名' : '/rank/drace',
  '统计数据' : '/rank/stats',
} 
const items: MenuProps['items'] = Object.keys(options).map((key, index) => {
  const children = options[key].length > 0 ? 
  options[key].map((site) => ({
    key: site,
    label: site,
  })) : 
  undefined;
  return {
    key,
    icon: React.createElement([  CrownOutlined, PartitionOutlined, HistoryOutlined, SearchOutlined, CalendarOutlined][index]),
    label: key,
    children,
  };
});

const CSider: React.FC = () => {
  const navigator = useNavigate()
  const onClick = ({ key }: { key: string | number }) => {
    navigator(sites[key])
  }
  return (
      <Sider width={180}
        breakpoint="md"
        collapsedWidth="0"
        className='sider'>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          onClick={onClick}
        />
      </Sider>
  )
}

export default CSider
