<script setup>
const location = useBrowserLocation();

onMounted(()=>{
  callTenantCheck();
})

const callTenantCheck = async() =>{
  const a = location.value.hostname.split(".")[0];
  $fetch("http://localhost:8000/api/v1/system/tenant/search", {
      query: {
        "sub": a
      },
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
      
    });
}
</script>
<template>
  <v-overlay
    persistent
    :model-value="true"
    scrim="black"
    content-class="w-100 h-100 d-flex align-center justify-center"
  >
    <v-progress-circular indeterminate size="120" color="primary" />
  </v-overlay>
</template>
