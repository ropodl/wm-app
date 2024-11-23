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
    // console.log(res);
    forums.value = res.forums;
    pagination.value = res.pagination;
  });
};
</script>
<template>
  <v-row>
    <template v-for="{ name, id } in forums">
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
              src="https://images.unsplash.com/photo-1645378198905-bca326a21167?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
