<script setup>
import { VNumberInput } from "vuetify/labs/VNumberInput";

const { setSnackbar } = useSnackbarStore();

const form = ref({
  title: "",
  suggestions: "",
  ratings: {
    ui: null,
    navigation: null,
    performance: null,
    content: null,
  },
});

const formRules = {
  suggestions: [
    (v) => !!v || "Suggestions is required",
    (v) => (v && v.length > 3) || "Suggestions must be 3 characters or more",
  ],
  ui: [
    (v) => !!v || "UI Ratings is required",
    (v) => v >= 0 || "UI Ratings must be above 0",
    (v) => v < 6 || "UI Ratings must be below or equal to 5",
  ],
  navigation: [
    (v) => v !== null || "Navigation Ratings is required",
    (v) => v >= 0 || "Navigation Ratings must be above 0",
    (v) => v < 6 || "Navigation Ratings must be below or equal to 5",
  ],
  performance: [
    (v) => !!v || "Performance Ratings is required",
    (v) => v >= 0 || "Performance Ratings must be above 0",
    (v) => v < 6 || "Performance Ratings must be below or equal to 5",
  ],
  content: [
    (v) => !!v || "Content Ratings is required",
    (v) => v >= 0 || "Content Ratings must be above 0",
    (v) => v < 6 || "Content Ratings must be below or equal to 5",
  ],
};

const formRef = ref(null);

const submit = async (isActive) => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios("user/feedback/create", {
      method: "POST",
      body: form.value,
    })
      .then((res) => {
        setSnackbar(res.message, "success");
        formRef.value.reset();
        isActive.value = false;
      })
      .catch((err) => {
        setSnackbar(err.response._data.error, "error");
      });
  }
};
</script>
<template>
  <v-dialog persistent scrollable max-width="500" height="80vh" scrim="black">
    <template v-slot:activator="{ props: activatorProps }">
      <v-list-item
        v-bind="activatorProps"
        color="primary"
        rounded="lg"
        prepend-icon="mdi-bullhorn-outline"
        title="Feedback"
      />
    </template>
    <template v-slot:default="{ isActive }">
      <v-form ref="formRef" @submit.prevent="submit(isActive)">
        <v-card flat title="Feedback">
          <v-card-text>
            <lazy-common-shared-field-label
              >Suggestions</lazy-common-shared-field-label
            >
            <v-textarea
              v-model="form.suggestions"
              class="mb-3"
              persistent-hint
              :rules="formRules.suggestions"
              hint="e.g Lorem ipsum"
            ></v-textarea>
            <lazy-common-shared-field-label>
              UI Ratings
            </lazy-common-shared-field-label>
            <v-number-input
              v-model="form.ratings.ui"
              variant="outlined"
              control-variant="default"
              :rules="formRules.ui"
              :min="1"
              :max="5"
              rounded="lg"
              persistent-hint
              hint="Out of 5"
              class="mb-3"
              type="text"
            ></v-number-input>
            <lazy-common-shared-field-label>
              Navigation Ratings
            </lazy-common-shared-field-label>
            <v-number-input
              v-model="form.ratings.navigation"
              variant="outlined"
              control-variant="outlined"
              :rules="formRules.navigation"
              :min="1"
              :max="5"
              persistent-hint
              hint="Out of 5"
              class="mb-3"
            ></v-number-input>
            <lazy-common-shared-field-label>
              Performance Ratings
            </lazy-common-shared-field-label>
            <v-number-input
              v-model="form.ratings.performance"
              variant="outlined"
              control-variant="outlined"
              :rules="formRules.performance"
              :min="1"
              :max="5"
              persistent-hint
              hint="Out of 5"
              class="mb-3"
            ></v-number-input>
            <lazy-common-shared-field-label>
              Content Ratings
            </lazy-common-shared-field-label>
            <v-number-input
              v-model="form.ratings.content"
              variant="outlined"
              control-variant="outlined"
              :rules="formRules.content"
              :min="1"
              :max="5"
              persistent-hint
              hint="Out of 5"
              class="mb-3"
            ></v-number-input>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
            <v-btn
              class="px-6"
              color="primary"
              variant="flat"
              type="submit"
              text="Submit"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </template>
  </v-dialog>
</template>
