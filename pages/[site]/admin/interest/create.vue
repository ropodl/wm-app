<script setup>
// const interest = useInterestStore();

definePageMeta({
  layout: "admin",
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
    const a = await useRequest("interest", {
      method: "POST",
      body: form.value,
      headers: {
        tenant_id: "tenant_test",
      },
    });
    console.log(a, "test");
  }
};

onMounted(async () => {
  const a = await useRequest("version-check");
  console.log(a);
});
</script>
<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Add Interest</h1>
        </v-col>
        <v-col cols="12" md="8">
          <lazy-common-field-label>Title</lazy-common-field-label>
          <v-text-field
            v-model="form.title"
            persistent-hint
            class="pb-3"
            hint="e.g Renewables, Non Renewables"
          ></v-text-field>
          <ClientOnly fallback="Loading editor...">
            <lazy-common-field-label>Description</lazy-common-field-label>
            <v-card
              border
              flat
              color="transparent"
              style="border: 1px solid rgba(255, 255, 255, 0.3)"
            >
              <QuillEditor
                v-model:content="form.content"
                type="html"
                theme="snow"
                toolbar="full"
                style="min-height: 500px"
              />
            </v-card>
          </ClientOnly>
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
<style lang="scss">
.ql-toolbar.ql-snow {
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.ql-editor {
  height: 500px;
}
.ql-container.ql-snow {
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
