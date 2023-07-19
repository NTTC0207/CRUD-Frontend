import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cn from './locales/zh-cn.json'
import en from './locales/en-us.json'
const resources = {
  cn: {
    translation: cn
  },

  en: {
    translation: en
  },
};
i18n.use(initReactI18next) //嗅探当前浏览器语言 zh-CN
.use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({ //初始化
    resources, //本地多语言数据
    fallbackLng: "en", //默认当前环境的语言
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
  })

export default i18n