<template>
  <div class="about">
    <h1>Przyjęcie stojaków develop</h1>
    <code-scanner v-model="scannedValue" />
    <p>{{ scannedValue }}</p>
  </div>
</template>
<script>
// @ is an alias to /src
import CodeScanner from "@/components/CodeScanner.vue";

export default {
  components: { CodeScanner },
  data() {
    return {
      scannedValue: "test",
    };
  },
};
</script>
