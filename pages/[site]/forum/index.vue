<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});

onMounted(() => {
  getAllForums();
});

const forums = ref([]);
const pagination = ref({});
const getAllForums = () => {
  useAxios("forums").then((res) => {
    forums.value = res.forums;
    pagination.value = res.pagination;
  });
};
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Forums</h1>
      </v-col>
    </v-row>
    <v-row>
      <template v-for="{ name, id, image } in forums">
        <v-col cols="12" md="4">
          <v-hover #default="{ isHovering, props }">
            <v-card
              v-bind="props"
              border
              flat
              color="transparent"
              :to="`/forum/${id}`"
              :ripple="false"
            >
              <v-img
                cover
                rounded="lg"
                height="200"
                class="align-end"
                :class="isHovering ? 'zoom-image' : ''"
                :src="image?.url"
                :alt="image?.name"
              >
                <v-card
                  border="t"
                  class="blur"
                  color="rgba(var(--v-theme-background),0.8)"
                  rounded="0"
                >
                  <v-card-text>{{ name }}</v-card-text>
                </v-card>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
