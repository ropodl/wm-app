<script setup>
const runtimeConfig = useRuntimeConfig();
const { setSnackbar } = useSnackbarStore();
const { coords, error, pause, resume } = useGeolocation();

const form = ref({
  name: "",
  user_name: "",
  email: "",
  password: "",
  longitude: null,
  latitude: null,
});

const confirm = ref("");
const rules = ref({
  name: [
    (v) => !!v || "Full Name is required",
    (v) => (v && v.length >= 3) || "Full Name must be mote than 3 characters",
  ],
  user_name: [
    (v) => !!v || "User Name is required",
    (v) => (v && v.length >= 3) || "User Name must be mote than 3 characters",
  ],
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
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
  ],
  confirmRule: [
    (v) => !!v || "Confirm Password is required",
    (v) => (v && v.length > 5) || "Password must be 5 or more characters",
    (v) => v === form.value.password || "Passwords do not match",
  ],
});

const formRef = ref(null);
const loading = ref(false);

const submit = async () => {
  resume();
  const { valid } = await formRef.value.validate();

  if (valid) {
    resume();
    form.value.latitude = coords.value.latitude;
    form.value.longitude = coords.value.longitude;
    useAxios(`${runtimeConfig.public.api}auth/signup`, {
      method: "POST",
      body: form.value,
    })
      .then((res) => {
        setSnackbar(res.message, "success");
        navigateTo("/login");
      })
      .catch((err) => {
        setSnackbar(err.response._data.error, "error");
      })
      .finally(() => {
        pause();
      });
  }
};

watch(error, (val) => {
  setSnackbar(val.message, "error");
});
</script>
<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-form ref="formRef" @submit.prevent="submit">
          <v-card-title class="px-0">
            <h3>Sign Up</h3>
          </v-card-title>
          <v-card border flat class="mb-3">
            <v-card-text class="pb-0">
              <lazy-common-shared-field-label>
                Full Name
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="form.name"
                :loading
                :disabled="loading"
                :rules="rules.name"
                density="compact"
              ></v-text-field>
              <lazy-common-shared-field-label>
                Username
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="form.user_name"
                :loading
                :disabled="loading"
                :rules="rules.user_name"
                density="compact"
              ></v-text-field>
              <lazy-common-shared-field-label>
                Email Address
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="form.email"
                :loading
                :disabled="loading"
                :rules="rules.email"
                density="compact"
              ></v-text-field>
              <lazy-common-shared-field-label>
                Password
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="form.password"
                :loading
                :disabled="loading"
                :rules="rules.password"
                density="compact"
              ></v-text-field>
              <lazy-common-shared-field-label>
                Confirm Password
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="confirm"
                :loading
                :disabled="loading"
                :rules="rules.confirmRule"
                density="compact"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn block variant="flat" color="primary" type="submit">
                Sign Up
              </v-btn>
            </v-card-actions>
          </v-card>
          <span class="d-flex justify-center"
            >Already have an account? &nbsp;
            <nuxt-link to="login">Back to Login</nuxt-link>
          </span>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
