import request from "../../api/request";

export function login(data: any) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
