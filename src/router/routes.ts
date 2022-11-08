export default [
  {
    path: "/",
    component: () => import("@/layouts/default.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/index.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile.vue"), // main page
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/hei/about",
        name: "hei-about",
        component: () => import("@/views/hei/about/index.vue"), // OTM haqida
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/hei/faculty",
        name: "hei-faculty",
        component: () => import("@/views/hei/faculty/index.vue"), // Fakultet
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/hei/cathedra",
        name: "hei-cathedra",
        component: () => import("@/views/hei/cathedra/index.vue"), // Kafedra
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/hei/section",
        name: "hei-section",
        component: () => import("@/views/hei/section/index.vue"), // bo'lim
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/employee-data/employee/:id",
        name: "employee",
        component: () =>
          import(
            "@/views/employee-information/employee-data/employee/[id].vue"
          ), //Xodim
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/employee-data",
        name: "employee-data",
        component: () =>
          import("@/views/employee-information/employee-data/index.vue"), //Xodimlar bazasi
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/foreign-professor",
        name: "foreign-professor",
        component: () =>
          import("@/views/employee-information/foreign-professor.vue"), //xodimlar ro'yxati
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/employee-list",
        name: "employee-list",
        component: () =>
          import("@/views/employee-information/employee-list/index.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/teacher-list",
        name: "teacher-list",
        component: () =>
          import("@/views/employee-information/teacher-list/index.vue"), //o'qituvchilar ro'yxati
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/scientific-status",
        name: "scientific-status",
        component: () =>
          import("@/views/employee-information/scientific-status/index.vue"), // ilmiy status
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/foreign-training",
        name: "foreign-training",
        component: () =>
          import("@/views/employee-information/foreign-training/index.vue"), // xorijiy faliyat
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/employee-information/employee-status",
        name: "employee-status",
        component: () =>
          import("@/views/employee-information/employee-status/index.vue"), //xodimlar xolati
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/students/index",
        name: "students",
        component: () => import("@/views/students/index.vue"), //talabalar kontengenti
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/archive/diplomas",
        name: "diplomas",
        component: () => import("@/views/archive/diplomas.vue"), //diplomlar ro'yxati
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/archive/circulation-sheet",
        name: "circulation-sheet",
        component: () => import("@/views/archive/circulation-sheet/index.vue"), // aylanma varaqa
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/archive/circulation-sheet/removeCirculationSheet",
        name: "removeCirculationSheet",
        component: () =>
          import(
            "@/views/archive/circulation-sheet/removeCirculationSheet.vue"
          ), //aylanma varaqa qo'shish
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/messages/compose",
        name: "messages-compose",
        component: () => import("@/views/messages/compose.vue"), //xabar yaratish
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/messages/grid",
        name: "messages-grid",
        component: () => import("@/views/messages/grid.vue"), //xabar yaratish
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/messages/index",
        name: "messages",
        component: () => import("@/views/messages/index.vue"), //mening xabarlarim
        // meta: {
        //   requiresAuth: true,
        // },
      },

      {
        path: "/pages/404",
        name: "pages-404",
        component: () => import("@/views/utility/404.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: "/pages/500",
        name: "pages-500",
        component: () => import("@/views/utility/500.vue"),
        // meta: {
        //   requiresAuth: true,
        // },
      },
    ],
  },
  // {
  //   path: '/hei/department_shablon',
  //   name: 'department_shablon',
  //   component: () => import('@/views/hei/department_shablon/index.vue') // Kafedra1
  // },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("@/views/auth/login.vue"),
  },
];
