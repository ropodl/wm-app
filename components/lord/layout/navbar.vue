<script setup>
const route = useRoute();

const navItems = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    routes: "/",
  },
  {
    icon: "mdi-note-multiple-outline",
    title: "Tenants",
    subitems: [
      { title: "All Tenants", routes: "/tenants" },
      { title: "Add Tenant", routes: "/tenants/create" },
    ],
  },
];

const bottomNavItems = ref([
  {
    icon: "mdi-bullhorn-outline",
    title: "Feedback",
    to: "/user/feedback",
  },
  {
    icon: "mdi-help-circle-outline",
    title: "Help",
    to: "/user/help",
  },
]);

const profileNavItems = ref([
  {
    icon: "",
    title: "test",
    to: "/",
  },
]);

const drawer = ref(true);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const logout = () => {
  console.log("this is a log out message");
};
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon rounded="lg" @click="toggleDrawer" />
    <v-breadcrumbs :items="['home', 'test']"></v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-btn icon="mdi-bell-outline" rounded="lg"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />

    <template v-slot:append>
      <v-list class="pa-2" density="comfortable">
        <template v-for="{ icon, title, to } in bottomNavItems">
          <v-list-item
            color="primary"
            rounded="lg"
            :prepend-icon="icon"
            :title
            :to
          />
        </template>
        <v-list-item
          color="primary"
          rounded="lg"
          prepend-icon="mdi-cog-outline"
          title="Settings"
          to="/user/settings"
          :active="route.fullPath.includes('/user/settings')"
        />
      </v-list>
      <v-divider></v-divider>
      <lazy-common-layout-navbar-profile-dropdown
        :user="'a'"
        :items="profileNavItems"
        @logout="logout"
      />
    </template>
  </v-navigation-drawer>
</template>
