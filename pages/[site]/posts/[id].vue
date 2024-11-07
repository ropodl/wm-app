<script setup>
definePageMeta({
  layout: "user",
  middleware: ['user-auth']
});

const {
  params: { id },
} = useRoute();
</script>
<template>
  <div>
    {{ id }}
  </div>
</template>

<style></style>
