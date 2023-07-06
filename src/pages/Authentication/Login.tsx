import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
    MailOutlined ,
    CodeSandboxOutlined ,
  } from '@ant-design/icons';
  import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
  } from '@ant-design/pro-components';
  import { AuthenticationWrapper } from './style';
  import { message, Space, Tabs ,Button,Divider,Tooltip} from 'antd';
  import type { CSSProperties } from 'react';
  import { useState } from 'react';
  import { useAuth0 } from "@auth0/auth0-react";
  
  type LoginType =  'account' | 'register'; // this is actually number
  
  const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '24px',
    verticalAlign: 'middle',
    cursor: 'pointer',
  };
  
  const Login = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const { loginWithRedirect } = useAuth0();

    return (
        <AuthenticationWrapper style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: 'white',border:"1px solid grey" }}>
          <LoginForm
       
         //   logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            title="CRUD"
            subTitle="testing"
         
          >
            <Tabs
              centered
              activeKey={loginType}
              onChange={(activeKey) => setLoginType(activeKey as LoginType)}
            >
              <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
              <Tabs.TabPane key={'register'} tab={'账号密码注册'} />
            </Tabs>
            {loginType === 'account' && (
              <>
                <ProFormText
                  name="username"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'用户名: admin or user'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'密码: password'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
                 <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
              >
                忘记密码
              </a>

            </div>
            <Button style={{ background: "#00b96b", color: "white" }} htmlType="submit" block size={"large"} >Login</Button>
            <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',

                    }}
                  >
                    {/* <Button type="primary" style={{ width: '100%' }}> Login</Button> */}
                    <Divider plain>
                      <span style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}>
                        Other Login Methods
                      </span>
                    </Divider>

                    <Space align="center" size={24}>
                      <div
                        style={{
                      
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          height: 40,
                          width: 40,
                          border: '1px solid #D4D8DD',
                          borderRadius: '50%',
                        }}
                      >
                        <Tooltip title="Okta Login">
                        <CodeSandboxOutlined onClick={() => loginWithRedirect()} style={{ ...iconStyles, color: '#722ED1' }} />
                        </Tooltip>
                      </div>
    
                    </Space>
                  </div>
              </>
            )}
             {loginType === 'register' && (
              <>
                <ProFormText
                  name="firstname"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'first name'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText
                  name="lastname"
                  fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'last name'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                  <ProFormText
                  name="email"
                  fieldProps={{
                    size: 'large',
                    prefix: <MailOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'email'}
                  rules={[
                    {
                      required: true,
                      message: '请输入用户名!',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'password'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
                 <ProFormText.Password
                  name="confirmPassword"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                  }}
                  placeholder={'confirm password'}
                  rules={[
                    {
                      required: true,
                      message: '请输入密码！',
                    },
                  ]}
                />
                 <div
              style={{
                marginBlockEnd: 24,
              }}
            >
            </div>
            <Button style={{ background: "#00b96b", color: "white" }} htmlType="submit" block size={"large"} >Register</Button>
              </>
            )}
            
           
          </LoginForm>
        </div>
      </ProConfigProvider>
      </AuthenticationWrapper>
    );
  };

  export default Login