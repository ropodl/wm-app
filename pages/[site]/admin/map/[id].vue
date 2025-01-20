<script setup>
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const form = ref({
  title: "",
  description: "",
  status: "Draft",
});

const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios(`interest/${route.params.id}`, {
      method: "PATCH",
      body: form.value,
    }).then((res) => {
      setSnackbar(res.message, "success");
    });
  }
};

onMounted(() => {
  useAxios(`interest/${route.params.id}`).then((res) => {
    form.value = res;
  });
});
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Add Interest</h1>
        </v-col>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label>Title</lazy-common-shared-field-label>
          <v-text-field
            v-model="form.title"
            persistent-hint
            class="pb-3"
            hint="e.g Renewables, Non Renewables"
          ></v-text-field>
          <lazy-common-shared-quill-editor v-model:content="form.description" />
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
