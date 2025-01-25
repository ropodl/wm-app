<script setup>
const form = ref({
  name: "",
  email: "",
  password: "",
  user_name: "",
});

const rules = {
  email: [],
};
const submit = () => {
  console.log("why");
};
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
                Email Address
              </lazy-common-shared-field-label>
              <v-text-field
                v-model="form.email"
                :loading
                :disabled="loading"
                :rules="rules.email"
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
            >Already have an account? &nbsp;<nuxt-link to="login"
              >Back to Login</nuxt-link
            >
          </span>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style></style>
