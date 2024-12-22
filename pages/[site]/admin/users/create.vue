<script setup>
const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"]
})

const form = ref({
  status: false
})
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
        <v-text-field label="Name"></v-text-field>
        <v-text-field label="Email Address"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-card border flat class="mb-3">
          <v-card-title>Actions</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <span class="font-weight-bold">Status:&nbsp;</span>
            {{ form.status ? "Published" : "Draft" }}
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-row>
              <v-col cols="6">
                <v-btn
                  block
                  color="warning"
                  height="40"
                  class="text-capitalize"
                  @click="form.status = false"
                >
                  Save as Draft
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  type="submit"
                  color="primary"
                  height="40"
                  variant="tonal"
                  class="text-capitalize"
                  @click="form.status = true"
                >
                  {{ route.params.id ? "Update" : "Publish Now" }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<style>

</style>