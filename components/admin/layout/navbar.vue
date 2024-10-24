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
      },{
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
      },{
        title: "Add Users",
        routes: "/admin/users/create",
      },
    ],
  },
];

const bottomNavItems = [{
  icon: "mdi-power",
  title: "Sign Out",
  router: "/"
}]
</script>
<template>
  <v-app-bar app elevation="0" border="b" height="60">
    <v-app-bar-nav-icon
      rounded="lg"
      @click="drawer = !drawer"
    ></v-app-bar-nav-icon>
    Admin Dashboard
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          width="48"
          height="48"
          rounded="lg"
          color="primary"
          v-bind="props"
        >
          <v-avatar size="48">
            <v-img
              src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Wayfarers&hairColor=SilverGray&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=FlatNatural&mouthType=Eating&skinColor=DarkBrown"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in appBarItems"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
                    <v-list-item color="primary"
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
            v-for="(item, index) in bottomNavItems"
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
