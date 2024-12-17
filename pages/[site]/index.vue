<script setup>
definePageMeta({
  layout: "user",
  middleware: ["user-auth"],
});
</script>
<template>
  <v-app>
    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Header -->
        <v-row>
          <v-col>
            <h2>Welcome, Adhi</h2>
          </v-col>
        </v-row>

        <!-- Top Stats -->
        <v-row>
          <v-col md="3">
            <v-card outlined>
              <v-card-title>Total R-waste Collection</v-card-title>
              <v-card-text>
                <!-- Display the fetched total waste -->
                <h3>{{ totalWaste }} kg</h3>
                <p>Total waste collected this month</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card outlined>
              <v-card-title>Total Users</v-card-title>
              <v-card-text>
                <h3>2000</h3>
                <p>+6.5% Since Last Month</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card outlined>
              <v-card-title>Total Donations</v-card-title>
              <v-card-text>
                <h3>1,000</h3>
                <p>-3.5% Since Last Month</p>
                <v-btn color="blue" @click="openDonationPage">Donate Now</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card outlined>
              <v-card-title>Total Partnerships</v-card-title>
              <v-card-text>
                <h3>150</h3>
                <p>+2.4% Since Last Month</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Action Buttons -->
        <v-row>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/campaing' }"
            >
              Create Recycling Campaign</v-btn
            >
          </v-col>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/recyclingguide' }"
            >
              Begineer Recycling Guide</v-btn
            >
          </v-col>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/posts' }"
              >View Posts</v-btn
            >
          </v-col>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/progress' }"
              >Your Recycling Progress</v-btn
            >
          </v-col>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/badges' }"
              >Achievements & Badges</v-btn
            >
          </v-col>
          <v-col md="4">
            <v-btn
              block
              outlined
              color="green"
              @click="createCampaign"
              :to="{ path: '/feedback' }"
              >View Feedback</v-btn
            >
          </v-col>
        </v-row>

        <v-row>
          <v-col md="4">
            <v-card outlined>
              <v-card-title>Scheduled Recycling Actions</v-card-title>
              <v-card-text>
                <p>Next Drop-off: 15th Dec, 2024</p>
                <br />
                <v-btn block outlined color="blue">Manage Schedule</v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col md="4">
            <v-card outlined>
              <v-card-title>Community Forum</v-card-title>
              <v-card-text>
                <p>
                  Your Last Post: "How can we encourage recycling in local
                  schools?"
                </p>
                <br />
                <v-btn
                  block
                  outlined
                  color="blue"
                  @click="createCampaign"
                  :to="{ path: '/forum' }"
                  >Go to Forum</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>

          <v-col md="4">
            <v-card outlined>
              <v-card-title>Upcoming Events</v-card-title>
              <v-card-text>
                <p>Event: "Sustainability Summit" - December 15, 2024</p>
                <br />
                <v-btn block outlined color="blue">Join Event</v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Bottom Stats -->
        <v-row>
          <v-col md="3">
            <v-card class="text-center" outlined>
              <h3>R-waste Collection</h3>
              <p>10k</p>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card class="text-center" outlined>
              <h3>R-waste Donation</h3>
              <p>5k</p>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card class="text-center" outlined>
              <h3>User Engagement</h3>
              <p>2k</p>
            </v-card>
          </v-col>
          <v-col md="3">
            <v-card class="text-center" outlined>
              <h3>Corporate Engagement</h3>
              <p>50</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalWaste: 0, // Initial value for total waste
    };
  },
  created() {
    this.fetchWasteData(); // Fetch data when the component is created
  },
  methods: {
    async fetchWasteData() {
      try {
        // Make an API call to the backend to fetch waste collection data
        const response = await axios.get(
          "http://localhost:3000/api/waste-collection"
        );

        // Update the totalWaste variable with the response data
        this.totalWaste = response.data.total;
      } catch (error) {
        console.error("Error fetching waste data:", error);
      }
    },
  },
};
</script>
