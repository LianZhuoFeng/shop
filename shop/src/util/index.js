import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import store from '../store/index.js'
let loadingObj  = null
const Service = axios.create({
    timeout:8000,
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Authorization":store.state.uInfo.userInfo.token
    }
})
// 请求拦截-增加loading,对请求做统一处理
Service.interceptors.request.use(config=>{
    loadingObj = ElLoading.service({
        lock: true,
        text: '请求中',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      return config
})

// 响应拦截 -对返回值做统一处理
Service.interceptors.response.use(res=>{
    loadingObj.close()
    const data = res.data
    if(data.meta.status!=200 && data.meta.status!=201){
        ElMessage.error({
            showClose: true,
            message:data.meta.msg || '服务器出错',
            type: 'error',
        })
        // location.replace(document.referrer)
        return data
    }
    return data
},err=>{
    loadingObj.close()
    ElMessage({
        message:'服务器错误',   
        type:err,
        duration:2000
    })
    
})
// post请求
export const post=function(config){
    return Service({
        ...config,
        method:'post',
        data:config.data
    })
}
export const get=function(config){
    return Service({
        ...config,
        method:'get',
        params:config.data
    })
}

export const put= function(config){
    return Service({
        ...config,
        method:'put',
        data:config.data
    })
}
export const reqDelete = function(config){
    return Service({
        ...config,
        method:'delete'
    })
}