import axios from 'axios';

const host = 'http://120.76.247.5:2001'


const instance = axios.create({
    // baseURL: 基础路径
    baseURL: host + '/api'
})



//判断host的具体类型
instance.host = host

//interceptors拦截器进行数据类型校验或者条件添加
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let userInfo = localStorage.getItem('userInfo')
    try{
        userInfo = JSON.parse(userInfo) || {}
    }catch(err){
        userInfo = {}
    }
    if(userInfo.Authorization){
        config.headers.Authorization = userInfo.Authorization

    }
    return config;
}, 
function (error) {
    // Do something with request error
    return Promise.reject(error);
});





export default instance

