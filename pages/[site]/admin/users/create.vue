<script setup>
const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const form = ref({
  status: false,
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Add User</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="8">
        <lazy-common-shared-field-label>
          User Name
        </lazy-common-shared-field-label>
        <v-text-field></v-text-field>
        <lazy-common-shared-field-label>
          Email Address
        </lazy-common-shared-field-label>
        <v-text-field label="Email Address"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <lazy-common-shared-actions :form />
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
