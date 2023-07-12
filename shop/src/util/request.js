import {get,post,put,reqDelete} from './index'
export const loginApi=data=>{
    return post({
        url:'/login',
        data
    })
}
export const userListApi=data=>{
    return get({
        url:'/users',
        data
    })
}

export const userAddApi=data=>{
    return post({
        url:'/users',
        data
    })
}

export const userChangeStateApi=data=>{
    return put({
        url:`users/${data.id}/state/${data.mg_state}`,
        data
    })
}

export const userEditApi = data =>{
    return put({
        url:`users/${data.id}`,
        data
    })
}

export const deleteUserApi = data =>{
    return reqDelete({
        url:`users/${data.id}`,
        data
    })
}

// 获取角色
export const getRolesApi = data =>{
    return get({
        url:'roles',
        data
    })
}

export const addRolesApi = data =>{
    return post({
        url:'roles',
        data
    })
}
export const editRolesApi = data =>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}

export const rolesDeleteApi = data =>{
    return reqDelete({
        url:`roles/${data.id}`,
        data
    })
}

export const goodsListApi =data =>{
    return get({
        url:`goods`,
        data
    })
}