<script setup>
const location = useBrowserLocation();

const loading = ref(true);
const error = ref({
  show: false,
  code: "",
  msg: "",
});

onMounted(() => {
  callTenantCheck();
});

const callTenantCheck = async () => {
  const sub_domain_name = location.value.hostname.split(".")[0];
  $fetch("http://localhost:8000/api/v1/system/tenant/search", {
    query: {
      sub: sub_domain_name,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      error.value = {
        show: true,
        code: err.response.status,
        msg: err.response._data.error,
      };
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <template v-if="loading">
    <v-progress-circular indeterminate color="primary" />
  </template>
  <template v-if="error.show">
    <div>
      <h1>{{ error.code }}</h1>
      <v-card-text class="pl-0">{{ error.msg }}</v-card-text>
    </div>
  </template>
</template>
