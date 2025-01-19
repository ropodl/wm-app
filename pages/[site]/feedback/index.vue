<script setup>
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

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
  title: [
    (v) => !!v || "Subject is required",
    (v) => (v && v.length > 10) || "Subject must be 10 characters or more",
  ],
  suggestions: [
    (v) => !!v || "Suggestions is required",
    (v) => (v && v.length > 3) || "Suggestions must be 3 characters or more",
  ],
  ui: [(v) => !!v || "UI Ratings is required"],
  navigation: [(v) => v !== null || "Navigation Ratings is required"],
  performance: [(v) => !!v || "Performance Ratings is required"],
  content: [(v) => !!v || "Content Ratings is required"],
};

const formRef = ref(null);

const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios("feedback/create", {
      method: "POST",
      body: form.value,
    }).then((res) => {
      setSnackbar(res.message, "success");
      formRef.value.reset();
    });
  }
};
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Feedback</h1>
          <p>
            Your feedback helps us understand what features, post, forums are
            relevant to you.
          </p>
        </v-col>
        <v-col cols="12">
          <v-row>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Subject</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.title"
                persistent-hint
                :rules="formRules.title"
                hint="e.g Lorem ipsum"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Suggestions</lazy-common-shared-field-label
              >
              <v-textarea
                v-model="form.suggestions"
                persistent-hint
                :rules="formRules.suggestions"
                hint="e.g Lorem ipsum"
              ></v-textarea>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >UI Ratings</lazy-common-shared-field-label
              >
              <v-rating
                v-model="form.ratings.ui"
                persistent-hint
                :rules="formRules.ui"
                required
              ></v-rating>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Navigation Ratings</lazy-common-shared-field-label
              >
              <v-rating
                v-model="form.ratings.navigation"
                :rules="formRules.navigation"
                required
              ></v-rating>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Performance Ratings</lazy-common-shared-field-label
              >
              <v-rating
                v-model="form.ratings.performance"
                persistent-hint
                :rules="formRules.performance"
                required
              ></v-rating>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Content Ratings</lazy-common-shared-field-label
              >
              <v-rating
                v-model="form.ratings.content"
                persistent-hint
                :rules="formRules.content"
                required
              ></v-rating>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block flat type="submit">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
