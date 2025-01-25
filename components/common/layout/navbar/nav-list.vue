<script setup>
const apperance = useApperanceStore();

defineProps({
  navItems: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-list>
    <template v-for="{ icon, title, subtitle, routes, subitems } in navItems">
      <template v-if="subtitle">
        <v-list-subheader>
          {{ subtitle }}
        </v-list-subheader>
      </template>
      <template v-if="subitems">
        <v-list-group :prepend-icon="icon">
          <template v-slot:activator="{ props }">
            <!-- with dropdown -->
            <v-list-item
              :density="apperance.density"
              rounded="lg"
              v-bind="props"
            >
              <v-list-item-title title="asd">
                {{ title }}
              </v-list-item-title>
            </v-list-item>
          </template>
          <template v-for="subitem in subitems">
            <template v-if="subitem.miniitems">
              <v-list-group>
                <template v-slot:activator="{ props }">
                  <v-list-item
                    :density="apperance.density"
                    color="primary"
                    rounded="lg"
                    v-bind="props"
                  >
                    <!-- child's option -->
                    <v-list-item-title>
                      {{ subitem.title }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
                <template v-if="subitem.miniitems">
                  <v-list-item
                    color="primary"
                    :density="apperance.density"
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
                color="primary"
                :density="apperance.density"
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
        <v-list-item
          color="primary"
          :density="apperance.density"
          rounded="lg"
          :to="routes"
        >
          <template v-slot:prepend>
            <v-icon :icon="icon"></v-icon>
          </template>
          <v-list-item-title>
            {{ title }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </template>
  </v-list>
</template>
