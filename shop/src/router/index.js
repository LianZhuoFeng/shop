import { createRouter, createWebHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut.vue'
import Login from '../views/pages/Login.vue'
import store from '../store/index'
const routes = [
  //登录页面
  {
    path:'/login',
    name:'Login',
    component:Login 
  },
  {
    path: '/',
    name: 'LayOut',
    component: LayOut,
    redirect:'/helloWorld',
    children:[
      {
        path:'/RolesList',
        name:'RolesList',
        component:()=>import('../views/pages/RolesList') 
      },
      {
        path:'/helloWorld',
        name:'HelloWorld',
        component:()=>import('../views/pages/HelloWorld')
      },
      {
        path:'/user',
        name:'UsersList',
        component:()=>import('../views/pages/UsersList')
      },
      {
        path:'/good',
        name:'GoodList',
        component:()=>import('../views/pages/GoodList')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from,next)=>{
  const uinfo = store.state.uInfo.userInfo
  if(!uinfo.username){
    if(to.path=='/login'){
      next()
      return
    }
    next('/login')
  }else{
    next()
  }
})
export default router
