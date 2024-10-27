<script setup>
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
];

const bottomNavItems = [
  {
    icon: "mdi-power",
    title: "Sign Out",
    router: "/",
  },
];
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
        :items="['test']"
        @logout="logout"
      />
    </template>
  </v-navigation-drawer>
</template>
