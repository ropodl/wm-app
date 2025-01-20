<script setup>
definePageMeta({
  layout: "user",
});

const form = ref({
  name: "",
  location: "",
  description: "",
  startDate: "",
  endDate: "",
  status: "Draft",
});

const formRef = ref(null);

const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    try {
      await useAxios("camping", {
        method: "POST",
        body: form.value,
      });
      form.value.status = "Submitted";
    } catch (error) {
      console.error("Submission failed:", error);
    }
  }
};

const resetForm = () => {
  form.value = {
    name: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Draft",
  };
};
</script>

<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Create Camping</h1>
        </v-col>
        <v-col cols="12" md="8">
          <lazy-common-shared-field-label
            >Camping Name</lazy-common-shared-field-label
          >
          <v-text-field
            v-model="form.name"
            persistent-hint
            class="pb-3"
            hint="e.g. City-wide Cleanup, River Bank Collection"
            :rules="[(v) => !!v || 'Name is required']"
          ></v-text-field>

          <lazy-common-shared-field-label
            >Location</lazy-common-shared-field-label
          >
          <v-text-field
            v-model="form.location"
            persistent-hint
            class="pb-3"
            hint="e.g. Kathmandu, Local Park"
            :rules="[(v) => !!v || 'Location is required']"
          ></v-text-field>

          <lazy-common-shared-field-label
            >Description</lazy-common-shared-field-label
          >
          <lazy-common-shared-quill-editor v-model:content="form.description" />

          <v-row>
            <v-col cols="6">
              <lazy-common-shared-field-label
                >Start Date</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.startDate"
                type="date"
                :rules="[(v) => !!v || 'Start Date is required']"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <lazy-common-shared-field-label
                >End Date</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.endDate"
                type="date"
                :rules="[(v) => !!v || 'End Date is required']"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" md="4">
          <v-card border flat>
            <v-card-title>Actions</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <ul class="list-style-none">
                <li>Status: {{ form.status }}</li>
              </ul>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
                <v-col cols="6">
                  <v-btn color="error" variant="tonal" block @click="resetForm"
                    >Cancel</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn type="submit" color="primary" variant="tonal" block>
                    Submit
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
