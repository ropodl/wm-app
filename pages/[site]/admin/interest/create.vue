<script setup>
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

const formRules = {
  title: [
    (v) => !!v || "Interest Title is required",
    (v) => (v && v.length > 3) || "Interest Title must be 3 characters or more",
  ],
};

const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios("interest", {
      method: "POST",
      body: form.value,
    })
      .then((res) => {
        console.log(res);
        setSnackbar("Interest created successfully", "success");
        navigateTo(`/admin/interest/${res.id}`);
      })
      .catch((err) => {
        setSnackbar(err.response._data.error, "error");
      });
  }
};
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
            class="pb-3"
            persistent-hint
            hint="e.g Renewables, Non Renewables"
            :rules="formRules.title"
          ></v-text-field>
          <lazy-common-shared-field-label>
            Description
          </lazy-common-shared-field-label>
          <v-textarea
            v-model="form.description"
            persistent-hint
            hint="Define the meaning of the interest"
          />
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
