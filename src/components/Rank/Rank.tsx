import React from "react"
import { Card, Tag, Table, Divider } from "antd"
import "./Rank.css"

interface myProps {
    type: string
}
const PRank: React.FC<myProps> = (props: myProps) => {
    //获取排名
    console.log(props.type)
    const rankData:Record<string,string|number>[]=[
        { '本期排名': 1, '上期排名': 1, '排名升降': 0, '昵称': '加油_郑钦文', '国籍': '中国', '总积分': 6602, '起计分': 60, '参赛数量': 28, '冠军总数': 3 },
        { '本期排名': 2, '上期排名': 3, '排名升降': 1, '昵称': 'liujiakun1201', '国籍': '法国', '总积分': 6040, '起计分': 30, '参赛数量': 28, '冠军总数': 4 },
        { '本期排名': 3, '上期排名': 2, '排名升降': -1, '昵称': '波斯科维奇', '国籍': '丹麦', '总积分': 5683, '起计分': 60, '参赛数量': 29, '冠军总数': 4 },
        { '本期排名': 4, '上期排名': 4, '排名升降': 0, '昵称': '苏三该走了呀呀', '国籍': '新西兰', '总积分': 4442, '起计分': 30, '参赛数量': 30, '冠军总数': 3 },
        { '本期排名': 5, '上期排名': 5, '排名升降': 0, '昵称': '科贝尔金满贯', '国籍': '德国', '总积分': 3930, '起计分': 60, '参赛数量': 34, '冠军总数': 4 },
        { '本期排名': 6, '上期排名': 6, '排名升降': 0, '昵称': '你是我的小馨蕴', '国籍': '比利时', '总积分': 3861, '起计分': 100, '参赛数量': 29, '冠军总数': 5 },
        { '本期排名': 7, '上期排名': 7, '排名升降': 0, '昵称': '日海岸', '国籍': '葡萄牙', '总积分': 3466, '起计分': 60, '参赛数量': 34, '冠军总数': 1 },
        { '本期排名': 8, '上期排名': 8, '排名升降': 0, '昵称': '黑白_大山', '国籍': '中国', '总积分': 3419, '起计分': 108, '参赛数量': 32, '冠军总数': 3 },
        { '本期排名': 9, '上期排名': 9, '排名升降': 0, '昵称': '只想睡觉ing', '国籍': '俄罗斯', '总积分': 3185, '起计分': 65, '参赛数量': 28, '冠军总数': 3 },
        { '本期排名': 10, '上期排名': 10, '排名升降': 0, '昵称': '顾影自怜475', '国籍': '俄罗斯', '总积分': 2933, '起计分': 65, '参赛数量': 32, '冠军总数': 2 },
        { '本期排名': 11, '上期排名': 12, '排名升降': 1, '昵称': '1小阿哥', '国籍': '比利时', '总积分': 2799, '起计分': 60, '参赛数量': 33, '冠军总数': 2 },
        { '本期排名': 12, '上期排名': 11, '排名升降': -1, '昵称': '发黄地瓜', '国籍': '捷克', '总积分': 2779, '起计分': 60, '参赛数量': 36, '冠军总数': 1 },
        { '本期排名': 13, '上期排名': 15, '排名升降': 2, '昵称': '莱巴金娜的老公', '国籍': '西班牙', '总积分': 2678, '起计分': 108, '参赛数量': 38, '冠军总数': 3 },
        { '本期排名': 14, '上期排名': 13, '排名升降': -1, '昵称': '披头散发13', '国籍': '法国', '总积分': 2540, '起计分': 100, '参赛数量': 33, '冠军总数': 2 },
        { '本期排名': 15, '上期排名': 14, '排名升降': -1, '昵称': '泰勒·弗里茨', '国籍': '美国', '总积分': 2524, '起计分': 1, '参赛数量': 19, '冠军总数': 1 },
        { '本期排名': 16, '上期排名': 29, '排名升降': 13, '昵称': '瓷娃娃iiii', '国籍': '法国', '总积分': 2492, '起计分': 60, '参赛数量': 24, '冠军总数': 3 },
        { '本期排名': 17, '上期排名': 17, '排名升降': 0, '昵称': '安德莱斯库', '国籍': '澳大利亚', '总积分': 2456, '起计分': 85, '参赛数量': 31, '冠军总数': 3 },
        { '本期排名': 18, '上期排名': 23, '排名升降': 5, '昵称': '大嘴丽丽', '国籍': '英国', '总积分': 2261, '起计分': 30, '参赛数量': 33, '冠军总数': 1 },
        { '本期排名': 19, '上期排名': 19, '排名升降': 0, '昵称': '大kk', '国籍': '新西兰', '总积分': 2256, '起计分': 180, '参赛数量': 34, '冠军总数': 1 },
        { '本期排名': 20, '上期排名': 18, '排名升降': -2, '昵称': 'ED小童鞋', '国籍': '中国台北', '总积分': 2215, '起计分': 55, '参赛数量': 26, '冠军总数': 0  }
    ];
    const columns=[]
    const tags=[]
    const staticTags=['本期排名','昵称','总积分']
    const [selectedTags, setSelectedTags] = React.useState<string[]>(staticTags);
    const handleTagChange = (tag:string , checked:boolean) => {
        const newSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
        setSelectedTags(newSelectedTags)
    }
    for (const titles in rankData[0]){
        if(!staticTags.includes(titles)){
            tags.push(<Tag.CheckableTag
                        key={titles}
                        checked={selectedTags.includes(titles)}
                        onChange={(checked)=> handleTagChange(titles,checked)}
                        >
                            {titles}
                        </Tag.CheckableTag>)
        }
        columns.push({
            title: titles,
            dataIndex: titles,
            hidden:!selectedTags.includes(titles),
            width:titles=="昵称"?'7%':'1%',
            sorter: (a: Record<string, string | number>, b: Record<string, string | number>) => {
                const aValue = a[titles];
                const bValue = b[titles];
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return aValue - bValue;
                } else {
                    if (aValue < bValue) {
                        return -1;
                    } else if (aValue > bValue) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
        })
    }
    const pagination = {
        total: rankData.length,
        showTotal: (total:number) => `共${total}位球员`,
        defaultPageSize: 20,
        defaultCurrent: 1,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
      };
    console.log(rankData)
    return (
        <div>
            <Card className="card-container">
                <div className="tag-container">
                    {tags}
                </div>
                <Divider />
                <Table dataSource={rankData} columns={columns} showSorterTooltip={false} pagination={pagination}/>
            </Card>
        </div>
    )
}

export default PRank