<script setup>
definePageMeta({
  layout: "guest",
});

const categories = [
  {
    title: "Plastic Recycling",
    icon: "mdi-bottle-soda",
    link: "/categories/plastic",
  },
  {
    title: "Metal Recycling",
    icon: "mdi-silverware-fork-knife",
    link: "/categories/metal",
  },
  {
    title: "Electronic Waste",
    icon: "mdi-cellphone",
    link: "/categories/electronics",
  },
  { title: "Paper Recycling", icon: "mdi-file", link: "/categories/paper" },
  {
    title: "Glass Recycling",
    icon: "mdi-glass-cocktail",
    link: "/categories/glass",
  },
];
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
      <!-- Welcome Section -->
      <v-col cols="12">
        <v-card class="mb-5" variant="flat" rounded="xl" color="primary" dark>
          <v-card-text class="py-12 text-center">
            <h1 class="text-h3 font-bold mb-3">Welcome to CDWRP</h1>
            <div class="text-h6 mb-3">
              Your one-stop portal for sustainable recycling initiatives.
            </div>
            <v-btn
              color="secondary"
              class="mb-3"
              href="http://lord.localhost:3000/"
            >
              Get Started as Lord
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- User Section -->
      <v-col cols="12" v-if="user">
        <h2 class="text-h5 font-semibold mb-3">
          Welcome Back, {{ user.name }}
        </h2>
        <v-card>
          <v-card-text>
            <p>Check your contributions and rewards:</p>
            <v-btn color="primary" href="/profile">View Profile</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-footer app color="primary" dark class="mt-5">
      <v-container>
        <p class="text-center">
          © 2025 GreenEarth Recycling. All rights reserved.
        </p>
      </v-container>
    </v-footer>
  </v-container>
</template>
