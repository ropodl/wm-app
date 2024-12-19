<script setup>
import { ref } from "vue";

// State to toggle the visibility of the image
const showImage = ref(false);

// Function to toggle the image visibility
const toggleImage = () => {
  showImage.value = !showImage.value;
};
</script>

<template>
  <v-container>
    <!-- Header -->
    <v-row>
      <v-col class="text-center">
        <h1 class="text-h4 mb-4">Beginner Recycling Guide</h1>
        <!-- GIF Integration -->
        <v-row class="my-4">
          <v-col class="text-center">
            <!-- Use GIF with img tag -->
            <img
              src="/pages/[site]/recyclingguide/giphy.webp"
              alt="Recycling Guide GIF"
              style="max-width: 800px; width: 100%; border-radius: 10px"
            />
          </v-col>
        </v-row>
        <p class="text-body-1">
          Welcome to the
          <strong>Community-Driven Waste Recycling Portal</strong>! Click the
          buttons below to see the guidence of recycling waste.
        </p>
      </v-col>
    </v-row>

    <!-- Button to Toggle Image -->
    <v-row class="my-4">
      <v-col class="text-center">
        <v-btn color="primary" @click="toggleImage" class="mb-4">
          5 Easy Ways to Process Household Waste
        </v-btn>
      </v-col>
    </v-row>

    <!-- Image Display -->
    <v-row v-if="showImage" class="my-4">
      <v-col class="text-center">
        <v-img
          src="/pages/[site]/recyclingguide/101.png"
          alt="5 Easy Ways to Process Household Waste"
          max-width="800"
          class="mx-auto"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  color: #2e7d32; /* Green shade */
  font-weight: bold;
}
</style>
