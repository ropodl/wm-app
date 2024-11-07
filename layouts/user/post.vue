<script setup>
const tab = ref("latest");
const tabs = ref([
  {
    title: "Latest",
    value: "latest",
  },
  {
    title: "Recomended",
    value: "recommended",
  },
]);
</script>
<template>
  <v-main>
    <NuxtLayout name="user">
      <v-container class="pa-0">
        <v-row no-gutters>
          <v-col cols="12" md="8">
            <div class="position-sticky bg-background" style="top: 61px;z-index:1000">
              <v-tabs v-model="tab" grow :transition="false">
                <template v-for="{ title, value } in tabs">
                  <v-tab :transition="false" :value="value">{{ title }}</v-tab>
                </template>
              </v-tabs>
              <v-divider></v-divider>
            </div>
            <v-card-text>
              <v-layout>
                <slot></slot>
              </v-layout>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              border="s"
              flat
              class="position-sticky"
              color="transparent"
              rounded="0"
              style="height: calc(100vh - 61px); top: 61px"
            >
              <v-card-title>This is a test</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </v-main>
</template>
