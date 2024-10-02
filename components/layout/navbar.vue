<script setup>
const drawer = ref(true);

defineProps({
  navitems: {
    type: Object,
    default: {},
  },
});

const navitems = [
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
      },
    ],
  },
];
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
  <v-navigation-drawer app v-model="drawer">
    <v-list density="compact" class="px-1">
      <template v-for="navitem in navitems">
        <template v-if="navitem.subtitle">
          <v-list-subheader>
            {{ navitem.subtitle }}
            <!-- <v-spacer></v-spacer> -->
            <v-chip size="small" color="primary">Aay</v-chip>
          </v-list-subheader>
        </template>
        <template v-if="navitem.subitems">
          <v-list-group :prepend-icon="navitem.icon">
            <template v-slot:activator="{ props }">
              <!-- main like dashboard -->
              <v-list-item density="compact" rounded="lg" v-bind="props">
                <v-list-item-title>
                  {{ navitem.title }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-for="subitem in navitem.subitems">
              <template v-if="subitem.miniitems">
                <v-list-group>
                  <template v-slot:activator="{ props }">
                    <v-list-item density="compact" rounded="lg" v-bind="props">
                      <!-- child's option -->
                      <v-list-item-title>
                        {{ subitem.title }}
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-if="subitem.miniitems">
                    <v-list-item
                      density="compact"
                      rounded="pill"
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
                  density="compact"
                  rounded="lg"
                  exact
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
          <v-list-item density="compact" rounded="lg" :to="navitem.routes">
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
  </v-navigation-drawer>
</template>
