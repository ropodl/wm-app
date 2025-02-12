<script setup>
const fullscreen = useIsFullScreen();

const drawer = defineModel();

const toggleFullScreen = () => {
  fullscreen.value.toggle();
};

defineProps({
  home: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(["logout"]);
</script>
<template>
  <v-app-bar
    app
    border="b"
    class="blur"
    color="rgba(var(--v-theme-background),0.8)"
    elevation="0"
    height="50"
  >
    <v-row align="center" class="mx-2">
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <v-app-bar-nav-icon rounded="0" height="50" @click="drawer = !drawer" />
        <v-btn rounded="0" height="50" :to="home">CDWRIP</v-btn>
        <slot name="left"></slot>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <slot name="middle"></slot>
      </v-col>
      <v-col cols="12" sm="4" md="4" class="pa-0">
        <div class="d-flex justify-end align-center">
          <slot name="right"></slot>
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
          <v-menu attach location-strategy="connected">
            <template v-slot:activator="{ props: menu }">
              <v-hover #default="{ isHovering, props: hover }">
                <v-list-item
                  density="comfortable"
                  rounded="0"
                  lines="one"
                  width="200"
                  height="50"
                  v-bind="{ ...menu, ...hover }"
                  :title="user.name"
                  :subtitle="user.email"
                >
                  <template #prepend>
                    <v-avatar rounded="lg">
                      <v-img
                        :class="isHovering ? 'zoom-image' : ''"
                        :src="user.image?.url"
                      ></v-img>
                    </v-avatar>
                  </template>
                </v-list-item>
              </v-hover>
            </template>
            <v-list border variant="flat" density="compact" class="py-0">
              <template v-if="items">
                <template v-for="{ icon, title, to } in items">
                  <v-list-item :prepend-icon="icon" :title :to />
                </template>
              </template>
              <v-divider></v-divider>
              <v-list-item
                prepend-icon="mdi-power"
                title="Log Out"
                @click="emits('logout')"
              />
            </v-list>
          </v-menu>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
