<script setup>
defineProps({
  label: {
    type: String,
    default: "Label",
  },
});
</script>
<template>
  <v-card-text class="pt-0 pl-0 font-weight-medium pb-2">
    <slot />
  </v-card-text>
</template>
