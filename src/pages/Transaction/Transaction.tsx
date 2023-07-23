import React, { useState, useRef, useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined, SettingOutlined, BarChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Avatar, Divider, Input, Button, Tour, Space, Typography, Modal, Form } from 'antd';
import AllUserData from './component/AllUserData';
import Settings from './component/Settings';
import UserTransaction from './component/UserTransaction';
import ImageUpload from './component/ImageUpload';
import type { TourProps } from 'antd';
import { useTranslation } from "react-i18next";
import { useCookies } from 'react-cookie';
import GraphPlot from './component/GraphPlot';

const { Header, Content, Sider } = Layout;
const { Search } = Input
const { Title, Text } = Typography


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

type ModeProps = {
  changeMode: () => void
  mode: boolean
}
interface profile {
  email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}



const Transaction: React.FC<ModeProps> = ({ changeMode, mode }) => {

  const { t, i18n } = useTranslation();
  let defaultLanguage = localStorage.getItem("language")

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [cookies] = useCookies(['XSRF-TOKEN']);
  const [profile, setProfile] = useState<profile>({} as profile)




  const { token: { colorBgContainer }, } = theme.useToken(); // change theme config
  const [isOn, setIsOn] = useState<Boolean>(false)
  const [myMenu, setMyMenu] = useState<Menu>("profile")
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  type Menu = "profile" | "settings" | "transaction" | "graph"

  const imageU: string = 'https://avatars.githubusercontent.com/u/25733842?s=40&v=4'



  const onOff = () => {
    setIsOn(!isOn)
  }

  const handleSetMenu = (val: number) => {

    setMyMenu(items2[val]?.key as Menu);
  };

  const items2: MenuItem[] = [
    getItem(
      <div onClick={() => handleSetMenu(0)}>{t("user")}</div>,
      "profile",
      <UserOutlined />
    ),
    getItem(
      <div onClick={() => handleSetMenu(1)}>{t("transaction")}</div>,
      "transaction",
      <LaptopOutlined />
    ),
    getItem(
      <div onClick={() => handleSetMenu(2)}>{t("graph")}</div>,
      "graph",
      <BarChartOutlined />
    ),
    getItem(
      <div onClick={() => handleSetMenu(3)}>{t("setting")}</div>,
      "settings",
      <SettingOutlined />
    ),
  ];

  useEffect(() => {
    setLoading(true);
    fetch('/api/profile', { credentials: 'include' }) // <.>
      .then(response => response.text())
      .then(body => {
        if (body === '') {
          setAuthenticated(false);
        } else {
          setProfile(JSON.parse(body));
          setAuthenticated(true);
        }
        setLoading(false);
      });
  }, [setAuthenticated, setLoading, setUser])

  const onFinish = async (values: any) => {
    console.log(cookies['XSRF-TOKEN'])
    await fetch('/api/transaction', {
      method: 'POST',
      headers: {
        'X-XSRF-TOKEN': cookies['XSRF-TOKEN'],
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values),
      credentials: 'include'
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))


  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{}}>
      <div style={{ position: "relative", height: "64px", width: "100%", zIndex: "500" }}>
        <div style={{ display: 'flex', alignItems: 'center', position: "fixed", width: "100%", height: "64px", zIndex: "100", overflow: "hidden", borderBottom: "1px solid #EAEAEA", paddingInline: "50px" }}>
          <div className="demo-logo" />

          <div style={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Title style={{ display: "flex", alignItems: "center", marginBottom: "0px" }} level={2}>Crud Project</Title>
            </div>


            <Search allowClear onFocus={onOff} onBlur={onOff} className="searchTransition" style={isOn === true ? { width: "600px" } : { width: "400px" }} placeholder={t("search")} />


            <div style={{ display: "flex", alignItems: 'center' }}>
              <Avatar src={profile.picture} size="large" />
              <Text style={{ marginLeft: "15px" }}> {profile.name}</Text>
            </div>
          </div>
        </div>
      </div>


      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['profile']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0, position: "fixed", width: "200px" }}
            items={items2}
          />
        </Sider>
        <Layout className="MyLayout" style={{ padding: '0 24px 24px', height: "90.5vh" }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{t("home")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("list")}</Breadcrumb.Item>
            <Breadcrumb.Item>{myMenu === "profile" && defaultLanguage === "cn" ? "用户" : myMenu === "settings" && defaultLanguage === "cn" ? "设置" : myMenu === "transaction" && defaultLanguage === "cn" ? "交易" : myMenu}</Breadcrumb.Item>
          </Breadcrumb>
          {/* <Button type="primary" onClick={showModal}>Add Transaction</Button> */}
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
              myMenu === "profile" ? <AllUserData /> :
                myMenu === "transaction" ? <UserTransaction /> :
                  myMenu === "settings" ? <Settings changeMode={changeMode} mode={mode} /> :
                    myMenu === "graph" ? <GraphPlot /> : null
            }

            {/* End User data table]*/}
            
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Transaction;