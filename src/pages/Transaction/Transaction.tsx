import React,{useState,CSSProperties} from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined,SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Avatar, Divider,Input } from 'antd';
import AllUserData from './component/AllUserData';
import Settings from './component/Settings';
import UserTransaction from './component/UserTransaction';

const { Header, Content, Sider } = Layout;
const {Search} =Input

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}




const Transaction: React.FC = () => {
      
    const { token: { colorBgContainer },} = theme.useToken(); // change theme config
    const [isOn, setIsOn] = useState<Boolean>(false)
    const [myMenu, setMyMenu] = useState<Menu>("Profile")
    type Menu = "Profile" | "Settings" | "Transaction"


    const onOff=()=>{
        setIsOn(!isOn)
    }

    const handleSetMenu = (val: number) => {
        setMyMenu(items2[val]?.key as Menu);
      };
      
      const items2: MenuItem[] = [
        getItem(
          <div onClick={() => handleSetMenu(0)}>User</div>,
          "Profile",
          <UserOutlined />
        ),
        getItem(
          <div onClick={() => handleSetMenu(1)}>Transaction</div>,
          "Transaction",
          <LaptopOutlined />
        ),
        getItem(
          <div onClick={() => handleSetMenu(2)}>Settings</div>,
          "Settings",
          <SettingOutlined />
        ),
      ];


    return (
        <Layout style={{ }}>
<div style={{position:"relative",height:"64px",width:"100%",zIndex:"500"}}>
            <Header style={{ display: 'flex', alignItems: 'center', background: "white",position:"fixed",width:"100%",height:"64px",zIndex:"100",overflow:"hidden",borderBottom:"1px solid #EAEAEA" }}>
                <div className="demo-logo" />

                <div style={{ width: '100%', display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                    <div style={{ fontSize: "1.5rem" }}>
                       Crud Project
                    </div>
                    <Search onFocus={onOff} onBlur={onOff}  className="searchTransition" style={isOn === true ? {width:"600px"}: {width:"400px"}} placeholder="Search for modules"/>
                    <div style={{  }}>
                        <Avatar src="https://avatars.githubusercontent.com/u/25733842?s=40&v=4" size="large" />
                    </div>
                </div>
            </Header>
            </div>
         
            
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer}}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0,position:"fixed",width:"200px" }}
                        items={items2}
                    />
                </Sider>
                <Layout className="MyLayout" style={{ padding: '0 24px 24px',height:"93.5vh" }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>{myMenu}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        style={{
                            // padding: 24,
                      
                            margin: 0,
                            minHeight: 400,
                            background: colorBgContainer,
                        }}
                    >
                        {/* Start User data table]*/}
              {
                myMenu==="Profile" ? <AllUserData />: myMenu === "Transaction" ? <UserTransaction/> : myMenu === "Settings" ?<Settings /> :null 
              }
                  


                        {/* End User data table]*/}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Transaction;