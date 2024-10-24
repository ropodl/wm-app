<script setup>
const route = useRoute();

const navItems = [
  {
    icon: "mdi-view-dashboard",
    title: "Dashboard",
    routes: "/lord/",
  },
  {
    icon: "mdi-note-multiple-outline",
    title: "Tenants",
    subitems: [
      { title: "All Tenants", routes: "/lord/tenants" },
      { title: "Add Tenant", routes: "/lord/tenants/create" },
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

const drawer = ref(true);
const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon rounded="lg" @click="toggleDrawer" />
    <v-breadcrumbs :items="['home', 'test']"></v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-btn icon="mdi-bell-outline" rounded="lg"></v-btn>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" class="pa-2">
    <v-list class="pt-0">
      <template v-for="navitem in navItems">
        <template v-if="navitem.subtitle">
          <v-list-subheader>
            {{ navitem.subtitle }}
          </v-list-subheader>
        </template>
        <template v-if="navitem.subitems">
          <v-list-group :prepend-icon="navitem.icon">
            <template v-slot:activator="{ props }">
              <!-- with dropdown -->
              <v-list-item rounded="lg" v-bind="props">
                <v-list-item-title>
                  {{ navitem.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-for="subitem in navitem.subitems">
              <template v-if="subitem.miniitems">
                <v-list-group>
                  <template v-slot:activator="{ props }">
                    <v-list-item color="primary" rounded="lg" v-bind="props">
                      <!-- child's option -->
                      <v-list-item-title>
                        {{ subitem.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-if="subitem.miniitems">
                    <v-list-item
                      color="primary"
                      rounded="lg"
                      v-for="mini in subitem.miniitems"
                      :to="mini.routes"
                    >
                      <!-- grand child -->
                      <v-list-item-title>
                        {{ mini.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-list-group>
              </template>
              <template v-else>
                <v-list-item
                  exact
                  color="primary"
                  rounded="lg"
                  :to="subitem.routes"
                >
                  <!-- child -->
                  <v-list-item-title rounded="lg">
                    {{ subitem.title }}
                  </v-list-item-title>
                </v-list-item>
              </template>
            </template>
          </v-list-group>
        </template>
        <template v-else>
          <v-list-item color="primary" rounded="lg" :to="navitem.routes">
            <template v-slot:prepend>
              <v-icon :icon="navitem['icon']"></v-icon>
            </template>
            <v-list-item-title>
              {{ navitem.title }}
            </v-list-item-title>
          </v-list-item>
        </template>
      </template>
    </v-list>

    <template v-slot:append>
      <v-list density="comfortable">
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
