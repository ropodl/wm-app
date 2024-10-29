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

const emits = defineEmits(["logout"]);
</script>
<template>
  <v-list-item
    height="60"
    append-icon="mdi-chevron-down"
    title="User Name"
    subtitle="Admin"
    variant="text"
    rounded="0"
    class="pr-0 py-0"
  >
    <template #prepend>
      <v-avatar rounded="lg">
        <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
      </v-avatar>
    </template>
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
        <v-list density="compact">
          <template v-for="{ icon, title, to } in items">
            <v-list-item :prepend-icon="icon" :title :to />
          </template>
          <v-list-item
            prepend-icon="mdi-power"
            title="Log Out"
            @click="emits('logout')"
          />
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>
