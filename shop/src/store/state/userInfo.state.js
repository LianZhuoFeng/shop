export default {
    namespace: true,
    state: {
        userInfo:(localStorage.getItem('userInfo')&&JSON.parse(localStorage.getItem('userInfo'))) || {}
    },
    getters: {
    },
    mutations: {
        setUserInfo(state,value){
            state.userInfo = value
        }
    },
    actions: {
    },
}