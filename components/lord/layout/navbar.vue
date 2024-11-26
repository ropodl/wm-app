<script setup>
const lord = useLordUserStore();

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
      { title: "All Tenants", routes: "/tenant" },
      { title: "Add Tenant", routes: "/tenant/create" },
    ],
  },
];

const profileNavItems = ref([
  // {
  //   icon: "",
  //   title: "test",
  //   to: "/",
  // },
]);

const drawer = ref(true);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon rounded="lg" @click="toggleDrawer" />
    System Admin
    <v-spacer></v-spacer>
    <v-btn icon="mdi-bell-outline" rounded="lg"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer">
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />

    <template v-slot:append>
      <v-list class="pa-2" density="comfortable">
        <!-- <template v-for="{ icon, title, to } in bottomNavItems">
          <v-list-item
            color="primary"
            rounded="lg"
            :prepend-icon="icon"
            :title
            :to
          />
        </template> -->
        <!-- <v-list-item
          color="primary"
          rounded="lg"
          prepend-icon="mdi-cog-outline"
          title="Settings"
          to="/settings"
          :active="route.fullPath.includes('/settings')"
        /> -->
      </v-list>
      <v-divider></v-divider>
      <lazy-common-layout-navbar-profile-dropdown
        :user="lord.user"
        :items="profileNavItems"
        @logout="lord.logOut()"
      />
    </template>
  </v-navigation-drawer>
</template>
