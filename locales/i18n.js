import i18n from 'i18n-js';

// Thiết lập ngôn ngữ mặc định
i18n.defaultLocale = 'en';

// Thiết lập các ngôn ngữ được hỗ trợ
i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = {
  en: {  Buy:"Buy",
  Sell:"Sell",
  AGE:"AGE",
  Off:"Off",
  Work:"Work",
  Call:"Call",
  Message:"Message",
  Phone:"Phone",
  Email:"Email",
  SMS:"SMS",
  Pass:"Pass",
  Address:"Address",
  AccountDetails:"Account Details",
  AccountType :"Account Type",
  Logout:"Log out",
  Date :"Date",
  Birthday :"Birthday",
  Datecome :"Date come",


},
  vi: { 
  Buy:"Mua",
  Sell:"Bán",
  AGE:"Tuổi",
  Off:"Nghỉ",
  Work:"Làm",
  Call:"Gọi",
  Message:"Tin nhắn",
  Phone:"Điện thoại",
  Email:"Email",
  SMS:"SMS",
  Pass:"Mk",
  Address:"Địa chỉ",
  AccountDetails:"Thông tin tài khoản",
  AccountType :"Loại tài khoản",
  Logout:"Đăng xuất",
  Date :"Ngày",
  Birthday :"Sinh nhật",
  Datecome :"Ngày vào",},
};

export default i18n;