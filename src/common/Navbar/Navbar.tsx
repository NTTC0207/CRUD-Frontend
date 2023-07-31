
import { Typography, Input, Avatar,Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchUserProfiles } from '../API/profileAPI';
import { Profile } from "../Interface/userInterface"
import { useLocation } from 'react-router-dom';

const { Title, Text } = Typography;
const { Search } = Input;

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOn, setIsOn] = useState<Boolean>(false)
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<Profile>({} as Profile);


  const getProfile = async () => {
    const profileData = await fetchUserProfiles();
    setProfile(profileData);
  }

  useEffect(() => {
    getProfile()
  }, [])


  const onOff = () => {
    setIsOn(!isOn)
  }

  if( location.pathname!="/auth"){
  return (
    <Layout>
    <div style={{ position: "fixed", height: "64px", width: "100%", zIndex: "500" }}>
      <div style={{ display: 'flex', alignItems: 'center', position: "fixed", width: "100%", height: "64px", zIndex: "100", overflow: "hidden", borderBottom: "1px solid #EAEAEA" }}>
        <div className="demo-logo" />

        <div style={{ width: '100%', display: "flex", alignItems: "center", justifyContent: "space-between",padding:'0px 5%' }}>
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
    </Layout>
  )
  }else{
    return null
  }

}

export default Navbar;