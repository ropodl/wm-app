<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const test = ref("test");
</script>
<template>
  <div>
    {{ test }}
  </div>
</template>
