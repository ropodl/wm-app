<script setup>
definePageMeta({
  layout: "admin"
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
    await useAxios("interest", {
      method: "POST",
      body: form.value
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
            persistent-hint
            class="pb-3"
            hint="e.g Renewables, Non Renewables"
          ></v-text-field>
          <lazy-common-shared-quill-editor v-model:content="form.description" />
        </v-col>
        <v-col cols="12" md="4">
          <v-card border flat>
            <v-card-title>Actions</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <ul class="list-style-none">
                <li>Status: Draft</li>
              </ul>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn color="error" variant="tonal" block>Cancel</v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn type="submit" color="primary" variant="tonal" block
                    >Submit</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
