<script setup>
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
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
    setSnackbar("Forum created successfully", "success");
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
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style></style>
