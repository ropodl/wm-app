<script setup>
const user = useUserStore();
const route = useRoute();
const fullscreen = useIsFullScreen();

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
    routes: "/forum"
  }
];

const bottomNavItems = ref([
  {
    icon: "mdi-bullhorn-outline",
    title: "Feedback",
    to: "/feedback",
  },
  {
    icon: "mdi-help-circle-outline",
    title: "Help",
    to: "/help",
  },
]);

const profileItems = ref([
  {
    icon: "mdi-logout",
    title: "Profile",
    to: "",
  },
]);

const drawer = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
const toggleFullScreen = () => {
  fullscreen.value.toggle();
};

const logout = () => {
  console.log("log out");
  user.logOut();
};

const breadcrumb = computed(() => {
  return [
    {
      title: "Home",
      disabled: false,
      to: "/",
    },
  ];
});
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon rounded="lg" @click="toggleDrawer" />
    User Dashboard
    <!-- <v-breadcrumbs :items="breadcrumb" class="text-decoration-none">
      <template v-slot:prepend>
        <v-icon size="small" icon="mdi-home-outline"></v-icon>
      </template>
    </v-breadcrumbs> -->
    <v-spacer></v-spacer>
    <!-- <v-btn icon="mdi-bell-outline" rounded="lg"></v-btn> -->
    <v-tooltip
          theme="light"
          location="bottom"
          :text="
            fullscreen.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'
          "
        >
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              rounded="0"
              height="50"
              @click="toggleFullScreen"
            >
              <v-icon :icon="`mdi-fullscreen${fullscreen.isFullscreen ? '-exit': ''}`">
              </v-icon>
            </v-btn>
          </template>
        </v-tooltip>
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
          to="/settings"
          :active="route.fullPath.includes('/settings')"
        />
      </v-list>
      <v-divider></v-divider>
      <lazy-common-layout-navbar-profile-dropdown
        :user="user.user"
        :items="profileItems"
        @logout="logout"
      />
    </template>
  </v-navigation-drawer>
</template>
<style lang="scss">
a.v-breadcrumbs-item--link {
  text-decoration: none;
}
</style>
