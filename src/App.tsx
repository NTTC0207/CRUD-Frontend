import React, { useState,useMemo, useEffect } from 'react';
import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Authentication/Login'
import Transaction from './pages/Transaction/Transaction';
import { Button, ConfigProvider ,Layout, ColorPicker, theme} from 'antd';
import "./scss/main.scss"
import { useTranslation } from "react-i18next";

const { defaultAlgorithm, darkAlgorithm } = theme;


const App:React.FC=()=>{
  const { t, i18n } = useTranslation();
  const [mode, setMode] =useState<boolean>(false);
  
  useEffect(()=>{
    const lang =localStorage.getItem("language")?.toString();
 i18n.changeLanguage(lang === null || lang === undefined ? "en" : lang)
},[])

  const changeMode=()=>{
    localStorage.setItem("mode", mode.toString())
    setMode(!mode)
  }
  useEffect(()=>{

  setMode(localStorage.getItem("mode") === "true" ? false: true); 
   
},[])


  return (
    <div>
      <ConfigProvider
    theme={{
      algorithm:  mode ? darkAlgorithm : defaultAlgorithm ,
      token: {
        colorPrimary: "#42b883",
      },
    }}
  >
  
            <div >
            {/* <p>{t('name')}</p>  */}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path="/transaction" element={<Transaction changeMode={changeMode} mode={mode} />} />

            </Routes>
            </div>
    
            </ConfigProvider>
    
    


    </div>
  )
}




export default App;
