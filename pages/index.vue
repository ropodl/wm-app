<script setup>
definePageMeta({
  layout: "guest",
});

const a = ref("")


const test = () => {
  const a = useRequest("version-check");
  console.log(a.data);
}
onMounted(()=>{
  test()
})
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Welcome to home page</h1>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
