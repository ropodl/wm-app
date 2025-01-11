<template>
  <v-main>
    <NuxtLayout name="user" />
    <v-tabs grow>
      <v-tab to="/posts">All</v-tab>
      <v-tab to="/posts/recommendation">Test</v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <NuxtPage />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup></script>

<style></style>
