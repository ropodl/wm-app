<script setup>
const user = useUserStore();
const route = useRoute();
const apperance = useApperanceStore();
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
    routes: "/forum",
  },
  {
    icon: "mdi-map-outline",
    title: "Maps",
    routes: "/maps",
  },
  {
    icon: "mdi-chart-line",
    title: "Analytic",
    routes: "/analytic",
  },
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

const profileItems = ref([]);

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
  <v-app-bar
    app
    border="b"
    color="rgba(var(--v-theme-background),0.8)"
    elevation="0"
    :density="apperance.density"
    style="backdrop-filter: blur(8px)"
  >
    <v-row align="center" class="mx-2">
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <v-app-bar-nav-icon
          rounded="lg"
          size="small"
          @click="drawer = !drawer"
        />
        <v-btn rounded="0" height="50">CBWRP</v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0"></v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <div class="d-flex justify-end align-center">
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
                <v-icon
                  :icon="`mdi-fullscreen${
                    fullscreen.isFullscreen ? '-exit' : ''
                  }`"
                >
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    style="backdrop-filter: blur(8px)"
  >
    <lazy-common-layout-navbar-nav-list class="pa-2" :nav-items="navItems" />
    <template v-slot:append>
      <v-list class="pa-2" :density="apperance.density">
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
