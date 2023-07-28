
import { Switch, Typography, Select, Col, Row } from 'antd'
import { useTranslation } from 'react-i18next'




type ModeProps = {
    changeMode: () => void
    mode: boolean
}

const { Text } = Typography
const Settings: React.FC<ModeProps> = ({ changeMode, mode }) => {

    const { t, i18n } = useTranslation();

    const handleChange = (e: any) => {
        i18n.changeLanguage(e)
        localStorage.setItem("language", e)
    }

    console.log(localStorage.getItem("language"))

    return (
        <div style={{ padding: "20px" }}>

            <Row>
                <Col span={2}>
                    <Text> {mode ? "Dark Theme" : "Light Theme"}: </Text>
                </Col>
                <Col>
                    <Switch checked={mode} onChange={changeMode} style={{ marginLeft: "5px" }} />
                </Col>



            </Row>

            <Row style={{marginTop:"15px"}}>
                <Col span={2} style={{display:"flex",alignItems:"center"}}>
                    <Text>{t("language")}: </Text>
                </Col>

                <Col>
                    <Select
                      size='small'
                        defaultValue={localStorage.getItem("language")===null ?"en":localStorage.getItem("language")}
                        onChange={(e) => handleChange(e)}
                        options={[
                            { value: 'en', label: 'English' },
                            { value: 'cn', label: 'Chinese' },
                        ]}
                    />
                </Col>

            </Row>










        </div>
    )
}


export default Settings