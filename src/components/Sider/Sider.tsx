import React from 'react'
import { SearchOutlined, HistoryOutlined, CalendarOutlined,PartitionOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Sider.css'

const { Sider } = Layout
const options: {[key:string]: (string | never)[] }= {
  '签表挑战': ['2024迈阿密'],
  '巡回赛历': [],
  'H 2 H': [],
  '历史战绩': []
};
const sites: {[key:string]: (string | never) } = {
  '2024迈阿密' : '/bc/1'
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
    icon: React.createElement([PartitionOutlined, CalendarOutlined, SearchOutlined, HistoryOutlined][index]),
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
