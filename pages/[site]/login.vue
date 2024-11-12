<script setup>
const admin = useAdminUserStore();
const user = useUserStore();
const token = useCookie("auth_token");

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

const login = async () => {
  $fetch("http://localhost:8000/api/v1/auth/login", {
    method: "POST",
    body: form.value,
  })
    .then((res) => {
      token.value = res.token;
      $fetch("http://localhost:8000/api/v1/auth/session", {
        headers: {
          Authorization: `Bearer ${res.token}`,
        },
      }).then((res) => {
        if (res.role === "user") {
          navigateTo("/", {
            replace: true,
          });
          user.setUser(res);
          user.setRole("user");
        } else if (["admin","editor"].includes(res.role)) {
          navigateTo("/admin/", {
            replace: true,
          });
          admin.setUser(res);
          admin.setRole("admin");
        } else {
          navigateTo("/404", {
            replace: true,
          });
        }
      });
    })
    .catch((err) => {
      console.log("error occured while fetching token", err);
    });
};
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
