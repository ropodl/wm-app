<script setup>
definePageMeta({
  layout: "user",
  middleware: ['user-auth']
});

const route = useRoute();

const post = ref({})
onMounted(()=>{
  useAxios(`/post/${route.params.id}`).then((res)=>{
    post.value = res
  })
})
</script>
<template>
  <div>
    {{ post }}
  </div>
</template>

<style></style>
