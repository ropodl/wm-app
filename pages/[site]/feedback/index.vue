<script setup>
definePageMeta({
  layout: "user",
});

const form = ref({
  title: "",
  suggestions: "",
  ratings: {
    ui: "",
    navigation: "",
    performance: "",
    content: "",
  },
});

const submit = async () => {
  await useAxios("feedback/create", {
    method: "POST",
    body: form.value,
  }).then((res) => {
    console.log(res);
  });
};
</script>
<template>
  <v-form @submit.prevent="submit">
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
                >Title</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.title"
                persistent-hint
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
                hint="e.g Lorem ipsum"
              ></v-rating>
            </v-col>
            <v-col cols="12" md="6"></v-col>
            <v-col cols="12" md="6">
              <lazy-common-shared-field-label
                >Navigation Ratings</lazy-common-shared-field-label
              >
              <v-rating
                v-model="form.ratings.navigation"
                persistent-hint
                hint="e.g Lorem ipsum"
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
                hint="e.g Lorem ipsum"
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
                hint="e.g Lorem ipsum"
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
