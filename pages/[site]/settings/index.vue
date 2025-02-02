<script setup>
const apperance = useApperanceStore();

definePageMeta({
  layout: "user-settings",
  middleware: ["user-auth"],
});
</script>
<template>
  <v-row>
    <v-col cols="12">
      <h1>Apperance Settings</h1>
    </v-col>
    <v-col cols="12">
      <v-card border flat>
        <v-list>
          <v-list-item
            title="Dark Theme"
            subtitle="Toggle the dark mode to enjoy darker"
          >
            <template #append>
              <v-switch v-model="apperance.dark" hide-details></v-switch>
            </template>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            title="Compact Mode"
            subtitle="Toogle the density of various ui elements"
          >
            <template #append>
              <v-select
                v-model="apperance.density"
                hide-details
                class="pt-3"
                density="compact"
                variant="outlined"
                :items="['default', 'comfortable', 'compact']"
              ></v-select>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
