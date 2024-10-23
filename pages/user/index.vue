<script setup>
definePageMeta({
    layout: "user"
})
const items = [{
    title: "Dashoard",
    to: "/user/dashboard"
},{
    title: "Profile",
    to: "/user/profile"
}]
</script>
<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3">
                This is user's home page
            </v-col>
            <v-col cols="12" md="9">
            </v-col>
        </v-row>
    </v-container>
</template>
