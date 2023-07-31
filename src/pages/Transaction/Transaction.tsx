import { useState, useEffect,FC } from 'react';
import { Layout, theme, } from 'antd';
import Settings from './component/Settings';
import UserTransaction from './component/UserTransaction';
import { Route, Routes } from 'react-router-dom';
import GraphPlot from './component/GraphPlot';
import Sidebar from './component/Sidebar';
import { MonthlyTransaction,ModeProps } from './Interface/userTransactionInterface';
import { fetchMonthlyTransactions } from './API/userTransactionAPI';

const { Content } = Layout;



const Transaction: FC<ModeProps> = ({ changeMode, mode }) => {
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

      <Layout className="MyLayout">

        <Content style={{ margin: 0, minHeight: 400, background: colorBgContainer }} >

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