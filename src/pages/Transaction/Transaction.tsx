import React, { useState, useEffect } from 'react';
import { Layout, theme, } from 'antd';
import Settings from './component/Settings';
import UserTransaction from './component/UserTransaction';
import { Route, Routes } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import GraphPlot from './component/GraphPlot';
import Sidebar from './component/Sidebar';
import { MonthlyTransaction } from './Interface/userTransactionInterface';
import { fetchMonthlyTransactions } from './API/userTransactionAPI';

const { Content } = Layout;



type ModeProps = {
  changeMode: () => void
  mode: boolean
}


const Transaction: React.FC<ModeProps> = ({ changeMode, mode }) => {
  const { token: { colorBgContainer }, } = theme.useToken(); // change theme config
  const [monthData, setData] = useState<MonthlyTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const asyncFetch = async () => {
    setLoading(true);
    const transData = await fetchMonthlyTransactions();
    setData(transData);
    setLoading(false);
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <Layout>

      <Sidebar />


      <Layout className="MyLayout" style={{ padding: '15px', height: "89.5vh" }}>

        <Content
          style={{
            margin: 0,
            minHeight: 400,
            background: colorBgContainer,
          }}
        >

          <Routes>
            <Route path={`/`} element={<UserTransaction monthData={monthData} loading={loading} asyncFetch={asyncFetch} />} />
            <Route
              path={`/settings`}
              element={<Settings changeMode={changeMode} mode={mode} />}
            />
            <Route path={`/graph`} element={<GraphPlot monthData={monthData} loading={loading} asyncFetch={asyncFetch} />} />
          </Routes>

        </Content>
      </Layout>
    </Layout>

  );
};

export default Transaction;