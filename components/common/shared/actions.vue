<script setup>
const route = useRoute();

defineProps({
  form: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <v-card border flat class="mb-3 position-sticky" style="top: 60px">
    <v-card-title>Actions</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <span class="font-weight-bold">Status:&nbsp;</span>
      {{ form.status === "Published" ? "Published" : "Draft" }}
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        type="submit"
        class="text-capitalize"
        @click="form.status = 'Draft'"
      >
        Save as Draft
      </v-btn>
      <v-btn
        color="primary"
        class="px-6 text-capitalize"
        variant="flat"
        type="submit"
        @click="form.status = 'Published'"
      >
        {{ route.params.id ? "Update" : "Publish Now" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<style></style>
