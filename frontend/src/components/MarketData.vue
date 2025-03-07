<template>
  <div id="app">
    <h1>Live Market Data</h1>
    <p>Current BTC/USDT Price: {{ price }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      price: "Loading...",
    };
  },
  created() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      const socket = new WebSocket("ws://localhost:8080"); // Rust backend'in WebSocket sunucusunun adresi

      socket.onopen = () => {
        console.log("Connected to WebSocket");
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        this.price = data.price; // Gelen fiyat bilgisini güncelle
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
