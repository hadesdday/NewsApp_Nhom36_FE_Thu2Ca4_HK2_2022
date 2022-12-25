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
  "Du lịch",
  "Công nghệ thông tin"
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
  GET_LIST: `${environment.SCRAPING_API}api/get/`,
  SEARCH: `${environment.SCRAPING_API}api/search/`,
  ARTICLE_DETAILS: `${environment.SCRAPING_API}article/`,
  ARTICLE_SAVED: `${environment.DB_URL}saved-post`,
  CONTACT: `${environment.DB_URL}contact`
}
