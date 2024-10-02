<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title>Add New Tenant</v-card-title>
                    <v-card-text>
                        <v-text-field label="Tenant Name"></v-text-field>
                        <v-text-field label="Tenant's Sub Domain name"></v-text-field>
                        <v-text-field label="Tenant's Primary Email Address"></v-text-field>
                        <v-btn block color="primary">Submit</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>