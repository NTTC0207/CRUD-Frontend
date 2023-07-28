import React, { useState, useMemo, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Button, ConfigProvider, Layout, ColorPicker, theme, Typography } from 'antd';
import "./scss/main.scss"
import { useTranslation } from "react-i18next";
import {Navbar} from "./common"

 
const { defaultAlgorithm, darkAlgorithm } = theme;
const { Title } = Typography
const Login = lazy(() => import("./pages/Authentication/Login"))
const Transaction = lazy(() => import("./pages/Transaction/Transaction"))


const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mode, setMode] = useState<boolean>(false);
  

  useEffect(() => {
    const lang = localStorage.getItem("language")?.toString();
    i18n.changeLanguage(lang === null || lang === undefined ? "en" : lang)
  }, [])

  const changeMode = () => {
    localStorage.setItem("mode", mode.toString())
    setMode(!mode)
  }
  useEffect(() => {

    setMode(localStorage.getItem("mode") === "true" ? false : true);

  }, [])


  return (
    <div>
      <ConfigProvider
        theme={{
          algorithm: mode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#42b883",
          },
        }}
      >

        <div >
    
          <Navbar />
      
          <Suspense fallback={<Layout style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}> <Title level={1} >Loading ... </Title> </Layout>}>
            <Routes>
              <Route path='/auth' element={<Login />} />
              <Route path="/main/*" element={<Transaction changeMode={changeMode} mode={mode} />} />
              <Route path="/" element={<RootRedirect />} />
            </Routes>
          </Suspense>
        </div>

      </ConfigProvider>




    </div>
  )
}

export default App;


const RootRedirect: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate('/main', { replace: true });
  }, [navigate]);
  return null; 
};