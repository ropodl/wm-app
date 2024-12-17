<script setup>
definePageMeta({
  layout: "user",
});

// import { onMounted } from "vue";
// import L from "leaflet"; // Import Leaflet

// onMounted(() => {
//   // Initialize the map
//   const map = L.map("map").setView([27.7172, 85.324], 13); // Centered on Kathmandu

//   // Add OpenStreetMap tile layer
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     maxZoom: 18,
//     attribution: "© OpenStreetMap contributors",
//   }).addTo(map);

//   // Add a marker to the map
//   L.marker([27.7172, 85.324])
//     .addTo(map)
//     .bindPopup("This is Kathmandu!")
//     .openPopup();
// });
</script>
<template>
  <v-ro>
    <v-col>
      <h1>Google Map: To Search Nearby Recycling Center</h1>
    </v-col>
  </v-ro>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.303702295846!2d85.30810247525497!3d27.738777176164618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1935856a6fa9%3A0xcda47ee70e2fb593!2sPaper%2C%20plastic%20and%20steel%20recycle!5e0!3m2!1sen!2snp!4v1734440453884!5m2!1sen!2snp"
    width="600"
    height="450"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>
</template>
<style></style>
