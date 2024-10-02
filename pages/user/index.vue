<script setup>
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
                <v-card>
                    <v-tabs direction="vertical">
                        <template v-for="item in items">
                            <v-tab class="text-none">{{ item.title }}</v-tab>
                        </template>
                    </v-tabs>
                </v-card>
            </v-col>
            <v-col cols="12" md="9">
                <slot/>
            </v-col>
        </v-row>
    </v-container>
</template>
