import React, { useState,useMemo } from 'react';
import logo from './logo.svg';
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Authentication/Login'
import Transaction from './pages/Transaction/Transaction';
import { Button, ConfigProvider ,Layout, ColorPicker, theme} from 'antd';
import type { Color,ColorPickerProps } from 'antd/es/color-picker';
import "./scss/main.scss"

const App=()=>{
  // const { token } = theme.useToken();
  // const [colorHex, setColorHex] = useState<Color | string>('#1677ff');
  // const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex');
  // const hexString = useMemo(
  //   () => (typeof colorHex === 'string' ? colorHex : colorHex.toHexString()),
  //   [colorHex],
  // );
  return (
    <div>

{/* <ColorPicker format={formatHex}
              style={{position:'absolute',top:"0",left:"500px",zIndex:"1000"}}
              value={colorHex}
              onChange={setColorHex}
              onFormatChange={setFormatHex}/> */}

      <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#42b883",

        
     
   
      
      },
    }}
  >
            <div >
    
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path="/transaction" element={<Transaction/>} />

            </Routes>
            </div>
    
            </ConfigProvider>
    
    


    </div>
  )
}




export default App;
