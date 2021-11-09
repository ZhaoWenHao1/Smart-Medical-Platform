import request from "../request";

export function getTransactionData(){
  return request({
    url:"/judgement",
    method:'GET'
  })
}
export function getErrorDetailData(){
  return request({
    url:"/errMessage",
    method:'GET'
  })
}
export function getUserRole(){
  return request({
    url:"/policy",
    method:'GET'
  })
}