<script setup>
const apperance = useApperanceStore();

const settings = ref([
  {
    icon: "mdi-palette-outline",
    title: "Apperance",
    to: "/settings",
  },
  {
    icon: "mdi-account-outline",
    title: "Account",
    to: "/settings/account",
  },
]);
</script>
<template>
  <v-main>
    <NuxtLayout name="user" />
    <v-container>
      <v-row>
        <v-col cols="12" md="3">
          <v-card border flat class="position-sticky" style="top: 70px">
            <v-list class="py-0" :density="apperance.density">
              <template v-for="{ icon, title, to } in settings">
                <v-list-item
                  color="primary"
                  :prepend-icon="icon"
                  :title
                  :to
                ></v-list-item>
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
