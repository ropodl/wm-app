<script setup>
definePageMeta({
  layout: "user",
  middleware: ['user-auth']
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        This is user's page
      </v-col>
    </v-row>
  </v-container>
</template>
