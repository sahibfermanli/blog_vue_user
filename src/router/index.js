import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: () => import('@/pages/auth/Register.vue'),
  },
  {
    path: '/login',
    name: 'auth',
    component: () => import('@/pages/auth/Login.vue'),
  },
  {
    path: '/',
    name: 'dashboard' ,
    component: () => import('@/pages/home/Index.vue'),
  },
  {
    path: '/blog/:id',
    name: 'blog_show' ,
    component: () => import('@/pages/home/ShowBlog.vue'),
  },

  // profile (auth)
  {
    path: '/profile/change-password',
    name: 'change_password',
    component: () => import('../pages/auth/ChangePassword.vue'),
  },

  // blogs
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('@/pages/blogs/Index.vue'),
    alias: ['/'],
  },
  {
    path: '/blogs/create',
    name: 'blogs_create',
    component: () => import('../pages/blogs/Create.vue'),
  },
  {
    path: '/blogs/:id',
    name: 'blogs_edit',
    component: () => import('../pages/blogs/Edit.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(), routes, linkActiveClass: 'menu-item-active',
})

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta

  if (authorize) {
    if (authorize.filter(row => row === true).length === 0) {
      return next({ name: 'dashboard' })
    }
  }

  next()
})


export default router
