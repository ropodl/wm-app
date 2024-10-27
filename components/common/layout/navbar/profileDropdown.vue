<script setup>
defineProps({
  user: {
    type: Object,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['logout'])
</script>
<template>
  <v-list-item
    height="60"
    prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
    append-icon="mdi-chevron-down"
    title="a"
    subtitle="test"
    variant="text"
    rounded="0"
    class="pr-0 py-0"
  >
    <template #append>
      <v-menu location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            height="60"
            variant="text"
            rounded="0"
            icon="mdi-dots-vertical"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="emits('logout')">
            <v-list-item-title>Log out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>
