import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        {
          path: 'xodimlar_royxati',
          name: 'xodimlar_royxati',
          component: () => import('../pages/EmployeeList.vue'),
        },
        {
          path: 'bolimlar_royxati',
          name: 'bolimlar_royxati',
          component: () => import('../pages/DepartamentList.vue'),
        },
        {
          path: 'case_manager_list',
          name: 'case_manager_list',
          component: () => import('../pages/CaseManagerList.vue'),
        }
      ],
    },

    // {
    //   path: '/',
    //   component: () => import('../layouts/blank.vue'),
    //   children: [
    //     {
    //       path: 'login',
    //       component: () => import('../pages/login.vue'),
    //     },
    //     {
    //       path: '/:pathMatch(.*)*',
    //       component: () => import('../pages/[...all].vue'),
    //     },
    //   ],
    // },
  ],
})

export default router
