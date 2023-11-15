<template>
  <div>
    <v-card-title>
      <span>Logi stojaka: {{ $route.params.standBarcode }}</span>
      <span class="ml-auto">
        <v-btn id="cancel-button" small color="amber" link to="/viewHistory"
          >Wróć</v-btn
        >
      </span>
    </v-card-title>
    <v-list v-if="logs.length">
      <v-list-item>
        <v-list-item-content>
          <v-card v-for="(log, idx) of logs" :key="idx">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col v-for="(head, id) of headers" :key="id">
                    <span class="text-subtitle-2">{{ log[head.value] }}</span>
                  </v-col>
                </v-row>
                <v-row v-if="log.action === 'Dodany do załadunku'">
                  <v-col cols="3">
                    <span>{{ log.clientName || log.standClient }}</span>
                  </v-col>
                  <v-col>
                    <span>{{ log.commande }}</span>
                  </v-col>
                </v-row>
                <v-row v-if="log.action === 'Wysłany'">
                  <v-col>
                    <span>{{ log.clientName || log.standClient }}</span>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>
<script>

import loginCheck from "@/mixins/loginCheck";

export default {
  mixins: [loginCheck],
  data() {
    return {
      logs: [],
      headers: [
        { text: "Akcja", value: "action", cols: 3 },
        { text: "Czas", value: "created_at", cols: 3 },
        { text: "Użytkownik", value: "user", cols: 3 },
      ],
    };
  },
  methods: {
    async getStandLogs(standId) {
      const res = await this.$axiosBBS.get(`showLoadsBBS/${standId}`);
      this.logs = res.data;
    },
  },
  async beforeMount() {
    await this.getStandLogs(this.$route.params.standId);
  },
};
</script>
