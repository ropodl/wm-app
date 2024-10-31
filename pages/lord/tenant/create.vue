<script setup>
definePageMeta({
  layout: "lord",
  middleware: ["lord-auth"]
})

const form = ref({
  name: "",
  sub: "",
  email: ""
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Create Tenant</h1>
      </v-col>
      <v-col cols="12" md="8">
            <lazy-common-shared-field-label>Tenant Name</lazy-common-shared-field-label>
            <v-text-field></v-text-field>
            <v-text-field label="Tenant's Sub Domain name"></v-text-field>
            <v-text-field label="Tenant's Primary Email Address"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
        <v-btn block color="primary">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
