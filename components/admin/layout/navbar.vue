<script setup>
const admin = useAdminUserStore();
const drawer = ref(true);

defineProps({
  navitems: {
    type: Object,
    default: {},
  },
});

const navItems = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    routes: "/admin/",
  },
  {
    icon: "mdi-calendar-text",
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
    icon: "mdi-thumb-up",
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
    icon: "mdi-format-list-checks",
    title: "Users",
    subitems: [
      {
        title: "All Users",
        routes: "/admin/users",
      },
      {
        title: "Add Users",
        routes: "/admin/users/create",
      },
    ],
  },
  {
    icon: "mdi-forum",
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
    icon: "mdi-cog",
    title: "Forum Settings",
    routes: "/admin/forums/settings",
  },
];

const profileItems = [];

const logout = () => {
  console.log("log out from admin");
  admin.logOut();
};
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon
      rounded="lg"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    Admin Dashboard
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />
    <template v-slot:append>
      <v-divider></v-divider>
      <lazy-common-layout-navbar-profile-dropdown
        :user="admin.user"
        :items="profileItems"
        @logout="logout"
      />
    </template>
  </v-navigation-drawer>
</template>
