import React,{useEffect,useState,useRef} from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Space, Table ,Avatar,Button,Skeleton,Popconfirm,Modal} from 'antd';
import axios from 'axios'
import moment from 'moment'
import { useTranslation } from 'react-i18next'


const endpoint ="http://localhost:4000/graph"


const query = `query {
  getAllUsers {
    id
    email
    lastname
    firstname
    role
    image_url
    image_name
    created_at
  }
}`;


interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;

}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  total: number;
  comission:number;
  archieved:number;
  isArchieved:string;
}

interface IUser{

    id:number;
    email:string;
    lastname:string;
    firstname:string;
    role:string;
    image_name:string;
    image_url:string;
    created_at :string;

}

interface UserDataResponse{
  data:{
    getAllUsers:IUser[]
  }
}



const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];

const AllUserData: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [user,setUser]=useState<IUser[]>();
  const [loader,setLoader] = useState<Boolean>(false)
  

  const [open, setOpen] = useState<boolean>(false);

  const mySkeleton=
  <div>
{
  Array.from({length:3}).map((_,i)=>{
    return(
      <span key={i}>
       <Skeleton active={true}  style={{margin:"15px 0px",}} /> 
      </span>
    )
  })
}

 
  </div>
 
  const getUserData=async()=>{
    setLoader(true)

    await setTimeout(() => {
       axios.post<UserDataResponse>(endpoint, { query })
      .then(res=>{
          setLoader(false)
          setUser(res.data.data.getAllUsers)
          console.log("Test data" ,res.data.data.getAllUsers)
      })
      .catch((err)=>console.log(err))
      .finally(()=>setLoader(false))
    }, 3000);
 
  
  }

  useEffect(()=>{
      getUserData()
  
  },[])

  const expandedRowRender = () => {
  
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: 'ID', dataIndex: 'key', key: 'date' },
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Total Quota', dataIndex: 'total', key: 'name' },
      { title: 'Comission', dataIndex: 'comission', key: 'name' },
      { title: 'Archieved Quota', dataIndex: 'archieved', key: 'name' },
      { title: 'Is Archived', dataIndex: 'isArchieved', key: 'name' },
      {
        title: 'Detail Transaction',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <Button type="primary">View</Button> 
        ),
      },
    ];

    const data = [];
    for (let i = 1; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        total: 20000,
        comission:200,
        archieved:1800,
        isArchieved:"No"
      });
    }
    return <Table  columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<IUser> = [
    { title:<> {t("no")}</> ,dataIndex:"id", key: 'name'}, // third parameter in render is index
    { title: <> {t("first")}</> , dataIndex: 'firstname', key: 'name' },
    { title:<> {t("last")}</>  , dataIndex: 'lastname', key: 'name' },
    { title: <> {t("email")}</> , dataIndex: 'email', key: 'platform' },
    { title: <> {t("image")}</> , dataIndex: 'image_url', key: 'version',render:(item)=><><Avatar alt="avatar" src={`${item}`} size="default" /> </> },
    { title: <> {t("role")}</>, dataIndex: 'role', key: 'upgradeNum' },
    { title: <> {t("date")}</> ,dataIndex:"created_at", key: 'createdAt',render:(item)=><div>{moment(item).format("MMM Do YY")}</div> },
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

  const data: DataType[] = [];
  for (let i = 0; i < 23; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screen',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
    
    {
      <Table
      
      columns={columns}
      locale={{
        emptyText: loader ? <div> {mySkeleton} </div> : null,
        
      }}
      
     // loading={true} use to load data
      rowKey={(record)=> record.id}
      
       pagination={{onChange:(page)=>{
    
       },
        pageSize:11,
        total:200}}
      expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
      dataSource={user} />

    } 
   
    </>
  );
};

export default AllUserData;