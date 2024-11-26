<script setup>
const snackbar = useSnackbarStore();

definePageMeta({
  layout: "lord",
});

const form = ref({
  name: "",
  sub: "",
  email: "",
  status: "Draft",
});

const formRef = ref();
const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    useAxios("system/tenant", {
      method: "POST",
      body: form.value,
    }).then((res) => {
      snackbar.setSnackbar("Successfully generated a tenant", "success");
    });
  }
};
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Create Tenant</h1>
        </v-col>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12">
              <lazy-common-shared-field-label
                >Tenant Name</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.name"
                persistent-hint
                hint="e.g. newroad"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <lazy-common-shared-field-label
                >Tenant's Sub Domain name</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.sub"
                persistent-hint
                hint="newroad"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <lazy-common-shared-field-label
                >Tenant's Primary Email Address</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.email"
                persistent-hint
                hint="john.doe@admin.com"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <lazy-common-shared-actions :form />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
