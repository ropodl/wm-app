<script setup>
const { setSnackbar } = useSnackbarStore();

definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const id = ref("");
const form = ref({
  positive: [],
  negative: [],
  spam: [],
});

onMounted(() => {
  getModeration();
});

const getModeration = () => {
  useAxios("/admin/moderation").then((res) => {
    id.value = res.id;
    form.value.positive = res.positive;
    form.value.negative = res.negative;
    form.value.spam = res.spam;
  });
};

const submit = () => {
  console.log("this");
  useAxios("/admin/moderation", {
    method: id.value ? "PATCH" : "POST",
    body: form.value,
  }).then((res) => {
    getModeration();
    setSnackbar(res.message, "success");
  });
};
</script>
<template>
  <v-form @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="text-h4 font-weight-bold">Forum Content Moderation</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <lazy-common-shared-field-label>
            Positive Words
          </lazy-common-shared-field-label>
          <v-combobox
            v-model.trim="form.positive"
            variant="outlined"
            chips
            multiple
            persistent-hint
            class="mb-3"
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip rounded="lg" size="large" closable>
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
          <lazy-common-shared-field-label>
            Negative Words
          </lazy-common-shared-field-label>
          <v-combobox
            v-model.trim="form.negative"
            variant="outlined"
            chips
            multiple
            persistent-hint
            class="mb-3"
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip rounded="lg" size="large" closable>
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
          <lazy-common-shared-field-label>
            Spam Words
          </lazy-common-shared-field-label>
          <v-combobox
            v-model.trim="form.spam"
            variant="outlined"
            chips
            multiple
            persistent-hint
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip rounded="lg" size="large" closable>
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col>
          <v-btn type="submit" color="primary" class="px-6">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
