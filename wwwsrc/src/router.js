import Vue from 'vue'
import Router from 'vue-router'
// @ts-ignore
import Home from './views/Home.vue'
// @ts-ignore
import Login from './views/Login.vue'
// @ts-ignore
import Keep from './views/Keep.vue'
// @ts-ignore
import Keeps from './views/Keeps.vue'
// @ts-ignore
import Vault from './views/Vault.vue'
// @ts-ignore
import Vaults from './views/Vaults.vue'
// @ts-ignore

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/keeps/:keepId',
      name: 'keep',
      component: Keep,
      props: true
    },
    {
      path: '/Keeps',
      name: 'keeps',
      component: Keeps
    },
    {
      path: '/vaults/:vaultId',
      name: 'vault',
      component: Vault,
      props: true
    },
    {
      path: '/vaults',
      name: 'vaults',
      component: Vaults
    },
  ]
})
