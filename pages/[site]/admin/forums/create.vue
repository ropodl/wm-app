<script setup>
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
});

const form = ref({
  name: "",
  description: "",
  image: null,
  status: "Draft",
});

const submit = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    const value = form.value[key];
    formData.append(key, value);
  }
  await useAxios("forums/create", {
    method: "POST",
    body: formData,
  }).then((res) => {
    setSnackbar("Post created successfully", "success");
    navigateTo(`/admin/forums/${res.id}`);
  });
};
</script>
<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Create Forum</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label
            >Forum Name</lazy-common-shared-field-label
          >
          <v-text-field v-model="form.name"></v-text-field>
          <lazy-common-shared-field-label
            >Forum Description</lazy-common-shared-field-label
          >
          <v-textarea v-model="form.description"></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-image-upload v-model="form.image" :form />
          <v-card border flat class="mb-3">
            <v-card-title>Actions</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <span class="font-weight-bold">Status:&nbsp;</span>
              {{ form.status ? "Draft" : "Published" }}
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
                    @click="form.status = 'Draft'"
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
                    @click="form.status = 'Published'"
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
  </v-form>
</template>
<style></style>
