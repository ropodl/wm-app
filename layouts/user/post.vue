<script setup>
const tab = ref("latest");
const tabs = ref([
  {
    title: "Latest",
    value: "latest",
  },
  {
    title: "Recomended",
    value: "recommended",
  },
]);

const computedTab = computed(() => {
  if (tab.value === "recommended") return "/posts/recommended";
  else return "/posts";
});

onMounted(()=>{
  callAllInterest();
})

const interests = ref([])
const callAllInterest = () => {
  useAxios('interest')
  .then((res)=>{
    interests.value = res.interests;
    pagination.value = res.pagination;
  })
}
</script>
<template>
  <v-main>
    <NuxtLayout name="user">
      <v-container fluid class="pa-0">
        <v-row no-gutters>
          <v-col cols="12" md="8">
            <div
              class="position-sticky bg-background"
              style="top: 61px; z-index: 1000"
            >
              <v-tabs v-model="tab" grow :transition="false">
                <v-tab :transition="false" to="/posts">Latest</v-tab>
                <v-tab :transition="false" to="/posts/recommendation">
                  Recommended
                </v-tab>
              </v-tabs>
              <v-divider></v-divider>
            </div>
            <v-card-text>
              <v-layout>
                <slot></slot>
              </v-layout>
            </v-card-text>
          </v-col>
          <v-col cols="12" md="4">
            <v-card
              border="s"
              flat
              class="position-sticky"
              color="transparent"
              rounded="0"
              style="height: calc(100vh - 61px); top: 61px"
            >
              <v-card-title>More Interests</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </NuxtLayout>
  </v-main>
</template>
