<script setup>
const cookies = useCookie('token_lord')

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
    login();
  }
};

const login = () => {
  console.log("lets login");
  $fetch("http://localhost:8000/api/v1/system/auth/login", {
    method: "POST",
    body: form.value,
  })
    .then((res) => {
      cookies.value = res.token;
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" md="4">
        <v-form ref="formRef" fast-fail @click.prevent="submit">
          <v-card border flat>
            <v-card-title>Login</v-card-title>
            <v-card-text class="pb-0">
              <lazy-common-field-label>Email Address</lazy-common-field-label>
              <v-text-field
                v-model="form.email"
                :rules="rules.email"
              ></v-text-field>
              <lazy-common-field-label>Password</lazy-common-field-label>
              <v-text-field
                v-model="form.password"
                :rules="rules.password"
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
