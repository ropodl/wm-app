<script setup>
const settings = ref([
  {
    icon: "mdi-palette-outline",
    title: "Apperance",
    to: "/user/settings",
  },
  {
    icon: "mdi-account-outline",
    title: "Account",
    to: "/user/settings/account",
  },
]);
</script>
<template>
  <v-main>
    <NuxtLayout name="user" />
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card border flat>
            <v-list class="py-0">
              <template v-for="{ icon, title, to } in settings">
                <v-list-item color="primary" :title :prepend-icon="icon" :to></v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <NuxtPage />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
