<script setup>
definePageMeta({
  layout: "guest",
});
const announcements = ref([
  {
    title: "Recycling Drive on Sunday!",
    date: "2025-01-28",
    description: "Join us for a community recycling drive.",
  },
  {
    title: "New Drop-Off Hours",
    date: "2025-01-15",
    description: "We have updated our drop-off timings for your convenience.",
  },
]);
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-5" variant="flat" rounded="xl" color="primary" dark>
          <v-card-text class="py-12 text-center">
            <h1 class="text-h3 font-bold mb-3">Welcome to CDWRP</h1>
            <div class="text-h6 mb-3">
              Your one-stop portal for sustainable recycling initiatives.
            </div>
            <v-btn href="http://lord.localhost:3000/">
              Get Started as Lord
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- Footer -->
  <v-footer app color="primary" dark class="mt-5">
    <v-container>
      <p class="text-center">Project by Aditya, Shahil and Saroj.</p>
    </v-container>
  </v-footer>
</template>
