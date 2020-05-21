import request from "./request.js";

export async function queryGoodList(option) {
  return request.get("/index.php", {
    params: {
      ...option,
    },
  });
}
export async function login(option) {
  return request.get("/index.php", {
    params: {
      main_page:'login',
      sign:'28fe4e8be969958ec956e3b7537a9cde',
      ...option,
    },
  });
}
//main_page=token&&uname=admin&pwd=2c1be7c6b94cd14c0b855a38900047a2
