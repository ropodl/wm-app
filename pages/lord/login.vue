<script setup>
const runtimeConfig = useRuntimeConfig();
const cookies = useCookie("auth_token_lord");

const lord = useLordUserStore();

const show = ref(false);
const loading = ref(false);
const form = ref({
  email: "",
  password: "",
  role: "lord",
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

const errors = ref([]);
const login = async () => {
  $fetch(`${runtimeConfig.public.api}auth/login`, {
    method: "POST",
    body: form.value,
  })
    .then((res) => {
      $fetch(`${runtimeConfig.public.api}auth/session`, {
        headers: {
          Authorization: `Bearer ${res.token}`,
        },
      })
        .then((res) => {
          if (res.role === "lord") {
            lord.setToken(res);
            navigateTo("/");
          } else navigateTo("/404");
        })
        .catch((err) => {
          console.log(err, "error");
        });
    })
    .catch((err) => {
      errors.value = err.response?._data.error;
    })
    .finally(() => {
      loading.value = false;
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
                :error-messages="errors"
                @update:model-value="errors = ''"
              ></v-text-field>
              <lazy-common-shared-field-label
                >Password</lazy-common-shared-field-label
              >
              <v-text-field
                v-model="form.password"
                :append-inner-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                :disabled="loading"
                :error-messages="errors"
                :loading
                :type="show ? 'text' : 'password'"
                :rules="rules.password"
                @click:append-inner="show = !show"
                @update:model-value="errors = ''"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="primary" variant="tonal" type="submit">
                Sign In
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
