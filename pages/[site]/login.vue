<script setup>
// const admin = useAdminUserStore();
const { signIn } = useAuth();
const runtimeConfig = useRuntimeConfig();
const tenant = useTenant();
console.log(useTenant() ? `tenant_${useTenant()}` : null);

const cookies = useCookie("auth_token_tenant_user");
const adminCookies = useCookie("auth_token_tenant_admin");
const show = ref(false);
const loading = ref(false);
const form = ref({
  email: "",
  password: "",
});

const rules = ref({
  email: [
    (v) => !!v || "Email is required",
    (v) => (v && v.length >= 3) || "Email must be less than 3 characters",
    (v) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || "Email Address must be in a valid format",
  ],
  password: [
    (v) => !!v || "Password is required",
    (v) => (v && v.length >= 3) || "Password must be more than 3 characters",
  ],
});

const formRef = ref(null);

const submit = async () => {
  const { valid } = await formRef.value.validate();
  
  if (valid) {
    loading.value = true;
    login();
  }
};

async function getSessionWithHeaders(token) {
  console.log(token);
  
  // const token = useCookie('token').value; // Retrieve JWT token from cookie (or wherever it's stored)

  const response = await $fetch(`${runtimeConfig.public.api}session/`, {
    method: "GET",
    headers: {
      // Authorization: `Bearer ${token}`,
      'asd':'asd',
      'tenant_id': `tenant_${tenant}`
    }
  });




  if (response.ok) {
    const data = await response.json();
    user.value = data.user;
    role.value = data.user?.role;
    tenant.value = data.user?.tenant;
  } else {
    // Handle session fetch error
    console.error("Failed to fetch session");
  }
}

const login = async () => {
  await signIn(
    form.value,
    {
      redirect: false,
    },
    {},
    {
      tenant_id: `tenant_${tenant}`,
    }
  );
  await getSession();
};
// await getSessionWithHeaders(token);

</script>
<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-form ref="formRef" @submit.prevent="submit">
          <v-card-title class="text-center px-0">Login</v-card-title>
          <v-card border flat>
            <v-card-text class="pb-0">
              <lazy-common-shared-field-label
                >Email Address</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.email"
                :loading
                :disabled="loading"
                :rules="rules.email"
              ></v-text-field>
              <lazy-common-shared-field-label
                >Password</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.password"
                :type="show ? 'text' : 'password'"
                :rules="rules.password"
                :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                :loading
                :disabled="loading"
                @click:append-inner="show = !show"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" variant="tonal" type="submit"
                >Sign In</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>
