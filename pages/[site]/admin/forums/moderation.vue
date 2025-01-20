<script setup>
definePageMeta({
  layout: "admin",
  middleware: ["admin-auth"],
});

const form = ref({
  positiveWords: [],
  negativeWords: [],
  spamWords: [],
});

const submit = () => {
  console.log("this");
};

const removePositiveSelection = (index) => {
  form.value.positiveWords.splice(index, 1);
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
            v-model.trim="form.positiveWords"
            variant="outlined"
            chips
            multiple
            persistent-hint
            class="mb-3"
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip
                rounded="lg"
                size="large"
                closable
                @click:close="removePositiveSelection(index)"
              >
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
          <lazy-common-shared-field-label>
            Negative Words
          </lazy-common-shared-field-label>
          <v-combobox
            v-model.trim="form.negativeWords"
            variant="outlined"
            chips
            multiple
            persistent-hint
            class="mb-3"
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip
                rounded="lg"
                size="large"
                closable
                @click:close="removePositiveSelection(index)"
              >
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
          <lazy-common-shared-field-label>
            Spam Words
          </lazy-common-shared-field-label>
          <v-combobox
            v-model.trim="form.spamWords"
            variant="outlined"
            chips
            multiple
            persistent-hint
            hint="Press enter for new item"
          >
            <template v-slot:chip="{ item, index }">
              <v-chip
                rounded="lg"
                size="large"
                closable
                @click:close="removePositiveSelection(index)"
              >
                {{ item.title }}
              </v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col>
          <v-btn color="primary" class="px-6">Submit</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
