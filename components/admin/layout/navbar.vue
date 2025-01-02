<script setup>
const admin = useAdminUserStore();
const apperance = useApperanceStore();

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
  {
    icon: "mdi-format-list-checks",
    title: "Users",
    subtitle: "User Management",
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

const profileItems = [
  {
    icon: "mdi-cog",
    title: "Settings",
    to: "/admin/settings",
  },
];

const logout = () => {
  console.log("log out from admin");
  admin.logOut();
};
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
        ></v-app-bar-nav-icon>
        <v-btn rounded="0" height="50">CBWRP</v-btn>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <!-- <v-autocomplete
          hide-details
          variant="outlined"
          density="compact"
          rounded="lg"
          placeholder="Search..."
          menu-icon=""
          height="35"
          style="margin-inline-end: 4px"
        ></v-autocomplete> -->
        <v-overlay
          persistent
          no-click-animation
          scrim="black"
          content-class="d-flex align-center justify-center w-100 h-100"
        >
          <template #activator="{ isActive, props }">
            <v-btn v-bind="props" border :ripple="false" height="35">
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
          </template>
          <v-card width="500">
            <v-card-title class="pa-0">
              <v-text-field
                autofocus
                autocomplete="off"
                hide-details
                prepend-inner-icon="mdi-magnify"
                variant="text"
                placeholder="Type a command or search..."
                clearable
              ></v-text-field>
            </v-card-title>
            <v-divider />
            <v-card-text> results </v-card-text>
          </v-card>
        </v-overlay>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <div class="d-flex justify-end">
          <v-btn :ripple="false" variant="text" rounded="0" height="50">
            <v-avatar>
              <v-img
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Eating&skinColor=DarkBrown"
              ></v-img>
            </v-avatar>
          </v-btn>
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
      <v-divider></v-divider>
      <lazy-common-layout-navbar-profile-dropdown
        :user="admin.user"
        :items="profileItems"
        @logout="logout"
      />
    </template>
  </v-navigation-drawer>
</template>
