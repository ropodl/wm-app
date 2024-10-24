<script setup>
definePageMeta({
  layout: "lord",
});

const headers = [
  {
    title: "Name",
    value: "name",
  },
  {
    title: "Actions",
    value: "actions",
  },
];

const items = [
  {
    name: "tenant_test",
  },
];
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>All Tenants</h1>
      </v-col>
      <v-col cols="12">
        <v-card border>
          <v-data-table :headers :items>
            <template #item.actions>
              <v-btn size="small" class="mr-3" color="primary" rounded="lg" icon="mdi-pen" variant="tonal"></v-btn>
              <v-btn size="small" rounded="lg" color="error" variant="tonal" icon="mdi-delete"></v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
