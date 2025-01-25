<script setup>
const user = useUserStore();
const route = useRoute();
const apperance = useApperanceStore();

const navItems = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    routes: "/",
  },
  {
    icon: "mdi-post-outline",
    title: "Posts",
    routes: "/posts",
  },
  {
    icon: "mdi-forum",
    title: "Forums",
    routes: "/forum",
  },
  {
    icon: "mdi-map-outline",
    title: "Recycling Centers",
    routes: "/maps",
  },
];

const bottomNavItems = ref([
  {
    icon: "mdi-cog-outline",
    title: "Settings",
    to: "/settings",
  },
]);

const profileItems = ref([
  { icon: "mdi-cog-outline", title: "Settings", to: "/settings" },
]);

const drawer = ref(true);

const logout = () => {
  user.logOut();
};

const home = ref("/");
</script>
<template>
  <lazy-common-layout-navbar-appbar
    v-model="drawer"
    :home
    :user="user.user"
    :items="profileItems"
    @logout="logout"
  />
  <v-navigation-drawer
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    style="backdrop-filter: blur(8px)"
  >
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />
    <template v-slot:append>
      <v-list class="pa-2" :density="apperance.density">
        <lazy-user-shared-feedback-form />
        <template v-for="{ icon, title, to } in bottomNavItems">
          <v-list-item
            color="primary"
            rounded="lg"
            :prepend-icon="icon"
            :title
            :to
            :active="route.fullPath.includes(to)"
          />
        </template>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
