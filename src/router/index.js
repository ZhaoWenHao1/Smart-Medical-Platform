import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const Main = () => import('../components/Main.vue')
const DataError = () => import('../components/DataError.vue')
const DataTrace = () => import('../components/newDataTrace.vue')
const DataTransaction = () => import('../components/DataTransaction.vue')
const UserRole = () => import('../components/UserRole.vue')
const routes = [
  {
    path:"/",
    name:"main",
    component:Main
  },
  {
    path:"/error",
    name:"error",
    component:DataError
  },
  {
    path:"/trace",
    name:"trace",
    component:DataTrace
  },
  {
    path:"/transaction",
    name:"transaction",
    component:DataTransaction
  },
  {
    path:"/userrole",
    name:"userrole",
    component:UserRole
  },
]
export default   new VueRouter({
  routes 
})

