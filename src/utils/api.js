import request from "./request.js";
import { getToken } from ".././utils/index";
export async function queryGoodList(option) {
  return request.get("/api/index.php", {
    params: {
      ...option,
    },
  });
}
export async function login(option) {
  return request.get("/api/index.php", {
    params: {
      main_page:'login',
      sign:'28fe4e8be969958ec956e3b7537a9cde',
      ...option,
    },
  });
}
export async function uploadGoodsInfo(option) {
  return request.post("/api/index.php", {
      main_page:'release',
      token:getToken(),
      ...option,
  });
}
export async function uploadImages(option) {
  return request.get("/api/index.php", {
    params: {
      main_page:'fixImages',
      token:getToken(),
      type:'path',
      ...option,
    },
  });
}
//main_page=token&&uname=admin&pwd=2c1be7c6b94cd14c0b855a38900047a2
