<script setup>
definePageMeta({
  layout: "admin",
});

const form = ref({
  title: "",
  description: "",
  status: "Draft",
});


const formRef = ref(null);
const submit = async () => {
  const { valid } = await formRef.value.validate();

  if (valid) {
    await useAxios("interest", {
      method: "PATCH",
      body: form.value
    });
  }
};
</script>
<template>
  <div></div>
</template>

<style></style>
