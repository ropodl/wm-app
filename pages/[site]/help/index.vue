<script setup>
definePageMeta({
  layout: "user",
  middleware: ['user-auth']
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        Help page for users
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
