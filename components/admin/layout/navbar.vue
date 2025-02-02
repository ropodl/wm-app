<script setup>
const admin = useAdminUserStore();

const drawer = ref(true);

const navItems = [
  {
    icon: "mdi-view-dashboard-outline",
    title: "Dashboard",
    routes: "/admin/",
  },
  {
    icon: "mdi-calendar-text-outline",
    title: "Posts",
    subtitle: "Posts and Interests",
    subitems: [
      {
        title: "All Posts",
        routes: "/admin/posts",
      },
      {
        title: "Add Posts",
        routes: "/admin/posts/create",
      },
    ],
  },
  {
    icon: "mdi-thumb-up-outline",
    title: "Interests",
    subitems: [
      {
        title: "All Interest",
        routes: "/admin/interest",
      },
      {
        title: "Add Interest",
        routes: "/admin/interest/create",
      },
    ],
  },
  {
    icon: "mdi-forum-outline",
    title: "Forums",
    subtitle: "Forums and Threads",
    subitems: [
      {
        title: "All Forums",
        routes: "/admin/forums",
      },
      {
        title: "Add Forums",
        routes: "/admin/forums/create",
      },
    ],
  },
  {
    icon: "mdi-cog-outline",
    title: "Forum Moderation",
    routes: "/admin/forums/moderation",
  },
  // {
  //   icon: "mdi-message-question-outline",
  //   title: "Spam Moderation",
  //   routes: "/admin/forums/spam",
  // },
  {
    icon: "mdi-map-search-outline",
    title: "Recycling Centers",
    subtitle: "Recycling Centers",
    subitems: [
      {
        title: "All Centers",
        routes: "/admin/map",
      },
      {
        title: "Add Center",
        routes: "/admin/map/create",
      },
    ],
  },
  // {
  //   icon: "mdi-format-list-checks",
  //   title: "Users",
  //   subitems: [
  //     {
  //       title: "All Users",
  //       routes: "/admin/users",
  //     },
  //     {
  //       title: "Add Users",
  //       routes: "/admin/users/create",
  //     },
  //   ],
  // },
  {
    subtitle: "Feedback",
    icon: "mdi-account",
    title: "Feedback",
    routes: "/admin/feedback",
  },
];

const profileItems = [
  {
    icon: "mdi-cog",
    title: "Settings",
    to: "/admin/settings",
  },
];

const logout = () => {
  admin.logOut();
};

const search = ref(false);

const home = ref("/admin/");
</script>
<template>
  <lazy-common-layout-navbar-appbar
    v-model="drawer"
    :home
    :user="admin.user"
    :items="profileItems"
    @logout="logout"
  >
    <template v-slot:middle>
      <v-btn block border :ripple="false" height="40" @click="search = true">
        <span>Search...</span>
        <v-card-text class="d-flex align-center pe-0 py-0">
          <v-icon class="mr-1" size="small" icon="mdi-apple-keyboard-command" />
          + k</v-card-text
        >
      </v-btn>
    </template>
  </lazy-common-layout-navbar-appbar>
  <lazy-common-shared-search-bar v-model="search" :navItems :profileItems />
  <v-navigation-drawer
    app
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    style="backdrop-filter: blur(8px)"
  >
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />
  </v-navigation-drawer>
</template>
