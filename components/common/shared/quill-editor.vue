<script setup>
const content = defineModel("content");

defineProps({
  label: {
    type: String,
    default: ""
  }
})
</script>
<template>
  <ClientOnly fallback="Loading editor...">
    <lazy-common-shared-field-label>{{ label }}</lazy-common-shared-field-label>
    <v-card
      border
      flat
      color="transparent"
      class="mb-4"
      style="border: 1px solid rgba(255, 255, 255, 0.3)"
    >
      <QuillEditor
        v-model:content="content"
        content-type="html"
        theme="snow"
        toolbar="full"
        style="min-height: 500px"
      />
    </v-card>
  </ClientOnly>
</template>
<style lang="scss" >
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
