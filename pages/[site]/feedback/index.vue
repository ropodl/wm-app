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
        <h1>Feedback</h1>
        <p>Your feedback helps us understand what features, post, forums are relevant to you.</p>
      </v-col>
      <v-col cols="12">
        <v-card border flat>
          <v-card-text>
            This is a test
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>