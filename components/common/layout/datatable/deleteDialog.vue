<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  item: {
    type: Object,
    default: {},
  },
});

const emits = defineEmits(["remove"]);
</script>
<template>
  <v-dialog persistent scrim="black" width="400">
    <template v-slot:activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        variant="text"
        size="small"
        rounded="lg"
        icon="mdi-delete"
      ></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card border density="compact" flat :title="`Delete ${type}`">
        <v-card-text class="pb-0">
          Are you sure you want to delete the {{ type }} named "<span
            class="text-red"
          >
            {{ title.trim() }}</span
          >" ?
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="px-6"
            text="Cancel"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            variant="flat"
            color="primary"
            class="px-6"
            text="Delete"
            @click="emits('remove', item, isActive)"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
