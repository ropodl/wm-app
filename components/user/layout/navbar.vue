<script setup>
const navItems = ref([
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    to: "/user/",
  },
]);

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
  {
    icon: "mdi-cog-outline",
    title: "Settings",
    to: "/user/settings",
  },
]);

const drawer = ref(true);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon rounded="lg" @click="toggleDrawer" />
    <v-spacer></v-spacer>
    <v-btn height="48" rounded="lg">
      <v-icon start icon="mdi-account" />
      Sign In
    </v-btn>
    <v-btn height="48" rounded="lg">Sign Up</v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" class="pa-2">
    <v-list class="pt-0">
      <template v-for="{ icon, title, to } in navItems">
        <v-list-item rounded="lg" :prepend-icon="icon" :title :to />
      </template>
    </v-list>
    <template v-slot:append>
      <v-list density="comfortable">
        <template v-for="{ icon, title, to } in bottomNavItems">
          <v-list-item rounded="lg" :prepend-icon="icon" :title :to />
        </template>
      </v-list>
      <v-menu attach location="top">
        <template v-slot:activator="{ props }">
          <v-list-item
            height="60"
            v-bind="props"
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            append-icon="mdi-chevron-down"
            title="a"
            subtitle="test"
            variant="tonal"
            rounded="lg"
          ></v-list-item>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in navItems"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-navigation-drawer>
</template>
