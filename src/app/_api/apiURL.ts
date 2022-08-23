import { environment } from "src/environments/environment";

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
  LOGIN: `${environment.DB_URL}login/`,
  USER: `${environment.DB_URL}user/`,
  USER1: `${environment.DB_URL}user`,
  RECOVER: `${environment}change-password`,
  CONFIRM_REGISTER: `${environment.BASE_URL}confirm-register`,
}

export const API_URL = {
  COMMENT: `${environment.DB_URL}comments`,
  READ_POST: `${environment.DB_URL}read-posts`,
  GET_LIST: `https://api-news-vietnamnet.herokuapp.com/api/get/`,
  SEARCH: `https://api-news-vietnamnet.herokuapp.com/api/search/`,
  ARTICLE_DETAILS: `https://api-news-vietnamnet.herokuapp.com/article/`,
  ARTICLE_SAVED: `${environment.DB_URL}saved-post`,
  CONTACT: `${environment.DB_URL}contact`
}
