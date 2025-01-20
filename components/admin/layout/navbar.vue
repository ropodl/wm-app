<script setup>
const admin = useAdminUserStore();
const apperance = useApperanceStore();
const fullscreen = useIsFullScreen();

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

const toggleFullScreen = () => {
  fullscreen.value.toggle();
};
</script>
<template>
  <v-app-bar
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
        ></v-app-bar-nav-icon>
        <v-btn rounded="0" height="50">CBWRP</v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <v-btn border :ripple="false" height="35" @click="search = true">
          <span class="mr-12">Search...</span>
          <v-card-text class="d-flex align-center pe-0 py-0">
            <v-icon
              class="mr-1"
              size="small"
              icon="mdi-apple-keyboard-command"
            />
            + k</v-card-text
          >
        </v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <div class="d-flex align-center justify-end">
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
  <lazy-common-shared-search-bar v-model="search" :navItems :profileItems />
  <v-navigation-drawer
    app
    v-model="drawer"
    color="rgba(var(--v-theme-background),0.8)"
    style="backdrop-filter: blur(8px)"
  >
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
