
const BASE_URL = "https://worldnow.herokuapp.com/";
const DB_URL = "https://fake-restful-news.herokuapp.com/";

export const API_SUB = [
  "Chính trị",
  "Thời sự",
  "Kinh doanh",
  "Thế giới",
  "Giải trí",
  "Thể thao",
  "Sức khỏe",
  "Đời sống",
  "Giáo dục",
  "Pháp luật",
  "Xe",
  "Công nghệ",
  "Bất động sản",
  "Du lịch"
];

export const API_AUTH = {
  LOGIN: `${DB_URL}login/`,
  USER: `${DB_URL}user/`,
  USER1: `${DB_URL}user`,
  RECOVER: `${BASE_URL}change-password`,
  CONFIRM_REGISTER: `${BASE_URL}confirm-register`,
}

export const API_URL = {
  COMMENT: `${DB_URL}comments`,
  READ_POST: `${DB_URL}read-posts`,
  GET_LIST: `https://api-news-vietnamnet.herokuapp.com/api/get/`,
  SEARCH: `https://api-news-vietnamnet.herokuapp.com/api/search/`,
  ARTICLE_DETAILS: `https://api-news-vietnamnet.herokuapp.com/article/`,
  ARTICLE_SAVED: `${DB_URL}saved-post`,
  CONTACT: `${DB_URL}contact`
}
