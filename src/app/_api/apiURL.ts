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
  LOGIN: `${environment.dbEnvironment}login/`,
  USER: `${environment.dbEnvironment}user/`,
  USER1: `${environment.dbEnvironment}user`,
  RECOVER: `${environment}change-password`,
  CONFIRM_REGISTER: `${environment.environment}confirm-register`,
}

export const API_URL = {
  COMMENT: `${environment.dbEnvironment}comments`,
  READ_POST: `${environment.dbEnvironment}read-posts`,
  GET_LIST: `https://api-news-vietnamnet.herokuapp.com/api/get/`,
  SEARCH: `https://api-news-vietnamnet.herokuapp.com/api/search/`,
  ARTICLE_DETAILS: `https://api-news-vietnamnet.herokuapp.com/article/`,
  ARTICLE_SAVED: `${environment.dbEnvironment}saved-post`,
  CONTACT: `${environment.dbEnvironment}contact`
}
