<script setup>
const route = useRoute();
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const form = ref({
  name: "",
  iframe: "",
  status: "Draft",
});

const formRules = {
  name: [
    (v) => !!v || "Recycling Center's Name is required",
    (v) =>
      (v && v.length > 3) ||
      "Recycling Center's Name must be 3 characters or more",
  ],
  iframe: [
    (v) => !!v || "Iframe is required",
    (v) => (v && v.length > 3) || "Iframe must be 3 characters or more",
  ],
};

const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios(`admin/map/${route.params.id}`, {
      method: "PATCH",
      body: form.value,
    })
      .then((res) => {
        console.log(res);
        setSnackbar(res.message, "success");
      })
      .catch((err) => {
        setSnackbar(err.response._data.error, "error");
      });
  }
};

const filterEmbedSource = (item) => {
  if (
    !item.trim().startsWith(`<iframe src="https://www.google.com/maps/embed?`)
  ) {
    form.value.iframe = "";
    return;
  }
  const srcMatch = item.match(/src="([^"]*)"/);
  form.value.iframe = srcMatch ? srcMatch[1] : null;
};

onMounted(() => {
  useAxios(`admin/map/${route.params.id}`).then((res) => {
    form.value = res;
  });
});
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Edit Recycling Center</div>
        </v-col>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label>Name</lazy-common-shared-field-label>
          <v-text-field
            v-model="form.name"
            persistent-hint
            class="mb-3"
            hint="e.g Plastic Sewa, Khali sisi"
            :rules="formRules.name"
          ></v-text-field>
          <lazy-common-shared-field-label
            >Embed source</lazy-common-shared-field-label
          >
          <v-textarea
            v-model="form.iframe"
            persistent-hint
            class="mb-3"
            hint="Copy embed html from google maps, we'll do the magic"
            :rules="formRules.iframe"
            @update:model-value="filterEmbedSource"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
