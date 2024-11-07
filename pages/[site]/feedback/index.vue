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
        Feedback from users to individual palika
      </v-col>
    </v-row>
  </v-container>
</template>