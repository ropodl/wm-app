<script setup>
defineProps({
  navItems: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <v-list>
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
</template>
<style></style>
