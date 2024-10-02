<script setup>
const form = ref({
    email: "",
    password: ""
})
</script>
<template>
    <v-container class="h-100">
        <v-row justify="center" align="center" class="h-100">
            <v-col cols="12" sm="6" md="4" class="h-100 align-center">
                <v-card>
                    <v-card-title>Sign In</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="form.email" label="Email Address"></v-text-field>
                        <v-text-field v-model="form.password" label="Password"></v-text-field>
                        <v-btn block color="primary">Submit</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>