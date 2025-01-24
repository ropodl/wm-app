<script setup>
import { useRoute } from "vue-router";

const route = useRoute();

// Access camping data passed from the previous page
const campingData = route.state?.campingData || {};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Camping Details</h1>
      </v-col>
      <v-col cols="12" md="8">
        <p><strong>Name:</strong> {{ campingData.name }}</p>
        <p><strong>Location:</strong> {{ campingData.location }}</p>
        <p><strong>Description:</strong></p>
        <div v-html="campingData.description"></div>
        <p><strong>Start Date:</strong> {{ campingData.startDate }}</p>
        <p><strong>End Date:</strong> {{ campingData.endDate }}</p>
        <p><strong>Status:</strong> {{ campingData.status }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
