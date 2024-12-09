<script setup>
definePageMeta({
  layout: "user-forum",
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
  <v-row>
    <template v-for="{ name, id, image } in forums">
      <v-col cols="12" md="6">
        <v-hover #default="{ isHovering, props }">
          <v-card
            v-bind="props"
            border
            flat
            rounded="lg"
            height="100"
            :to="`/forum/${id}`"
          >
            <v-img
              cover
              :class="isHovering ? 'zoom-image' : ''"
              :src="image?.url"
              :alt="image?.name"
            >
              <v-overlay
                :model-value="true"
                contained
                persistent
                no-click-animation
                class="align-end"
                scrim="black"
              >
                <v-card-title>{{ name }}</v-card-title>
              </v-overlay>
            </v-img>
          </v-card>
        </v-hover>
      </v-col>
    </template>
  </v-row>
</template>
<style></style>
