import {FC} from 'react';
import { Typography,Table ,Button,Popconfirm} from 'antd';
import type { TableColumnsType } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next'

const {Title , Text} = Typography;

//type can be use for all type of combination (include method and non obj ... )
// interface 只能描述对象（object） 结构


interface Transaction{
    id:number,
    localDate:string,
    amount:number,
}

interface MonthlyTransaction{
    key: React.Key;
    date: string;
    total: number;
    comission:number;
    archieved:boolean;
    isArchieved:boolean;
}


const UserTransaction:FC =()=>{

    const { t, i18n } = useTranslation();

    const columns: TableColumnsType<MonthlyTransaction> = [
        { title:<> {t("no")}</> ,dataIndex:"id", key: 'name'}, // third parameter in render is index
        { title: <> {t("total")}</> , dataIndex: 'total', key: 'name' },
        { title: <> {t("comission")}</> , dataIndex: 'comission', key: 'name' },
        { title: <> {t("archieved")}</> , dataIndex: 'archieved', key: 'name' },
        { title: <> {t("isArchieved")}</> , dataIndex: 'isArchieved', key: 'name' },
        { title: <> {t("date")}</> ,dataIndex:"date", key: 'createdAt',render:(item)=><div>{moment(item).format("MMM Do YY")}</div> },
        { title: <> {t("action")}</> , key: 'operation', render: (item) =>
        <div style={{display:"flex"}}>
           <Button  type="primary">  {t("view")}</Button> 
           <Popconfirm
           title={`delete the task ${item.firstname} with id ${item.id}`}
           description ="Are you sure to delete this task?"
           >
           <Button  type="primary" style={{marginLeft:"10px"}} danger>{t("update")}</Button> 
           </Popconfirm>
           
           </div>
        },
      ];

      //expandable table 
      const expandedRowRender = () => {
  
        const columns: TableColumnsType<Transaction> = [
          { title: 'ID', dataIndex: 'key', key: 'date' },
          { title: <> {t("date")}</> ,dataIndex:"date", key: 'createdAt',render:(item)=><div>{moment(item).format("MMM Do YY")}</div> },
          { title: 'Total Quota', dataIndex: 'total', key: 'name' },
          {
            title: 'Detail Transaction',
            dataIndex: 'operation',
            key: 'operation',
            render: () => (
              <Button type="primary">View</Button> 
            ),
          },
        ];
    
        // const data = [];
        // for (let i = 1; i < 3; ++i) {
        //   data.push({
        //     key: i.toString(),
        //     date: '2014-12-24 23:12:00',
        //     total: 20000,
        //     comission:200,
        //     archieved:1800,
        //     isArchieved:"No"
        //   });
        // }
        return <Table  columns={columns} pagination={false} />;
      };

    return (
        <>

        <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        />

        </>
    )
}


export default UserTransaction;