<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

const a = ref("test");
</script>
<template>
  <div>asd{{ a }}</div>
</template>

<style></style>
