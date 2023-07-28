import { Layout, Menu } from "antd"
import { useState } from "react";
import type { MenuProps } from 'antd';
import { Link } from "react-router-dom";
import { LaptopOutlined, SettingOutlined, BarChartOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";


const { Content, Sider } = Layout;

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


const Sidebar = () => {


    const [myMenu, setMyMenu] = useState<Menu>("transaction")
    type Menu = "transaction" | "settings" | "graph"
    const { t, i18n } = useTranslation();

    const handleSetMenu = (val: number) => {
        setMyMenu(items2[val]?.key as Menu);
    };

    const items2: MenuItem[] = [

        getItem(
            <div>{t("transaction")}</div>,
            "transaction",
            <Link to={`/main`} onClick={() => handleSetMenu(0)}>   <LaptopOutlined /></Link>
        ),
        getItem(
            <div>{t("graph")}</div>,
            "graph",
            <Link to={`/main/graph`} onClick={() => handleSetMenu(1)}> <BarChartOutlined /></Link>

        ),
        getItem(
            <div >{t("setting")}</div>,
            "settings",
            <Link to={`/main/settings`} onClick={() => handleSetMenu(2)}> <SettingOutlined /></Link>
        ),
    ];



    return (
        <>

            <Sider width={200} >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['transaction']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0, position: "fixed", width: "200px" }}
                    items={items2}
                />
            </Sider>

            
        </>
    )
}

export default Sidebar;