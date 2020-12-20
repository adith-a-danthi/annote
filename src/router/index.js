import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "@/utils/firebase";
import Home from '../views/Home.vue'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth.currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) {
      next('login');
    } else if (!requiresAuth && currentUser) {
      next('home');
    } else {
      next();
    }

});

export default router
