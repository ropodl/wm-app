<script setup>
definePageMeta({
  layout: "user-post",
  middleware: ['user-auth']
});

const latest = ref([]);

onMounted(()=>{
  getLatest();
})

const getLatest = async() => {
  latest.value = await useAxios("post/latest");
  console.log(latest.value);
}
</script>
<template>
  <v-row>
    <v-col v-for="{title, featuredImage, slug} in latest.posts">
      <v-card border flat color="transparent" :to="`/posts/${slug}`" :ripple="false">
        <v-card-title>{{ title }}</v-card-title>
          <v-img height="250" :src="featuredImage.url"></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>
<style></style>
