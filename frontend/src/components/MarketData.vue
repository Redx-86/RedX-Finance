<template>
  <div>
    <h1>Current BTC/USDT Price: {{ price ? price : "Loading..." }}</h1>
  </div>
</template>

<script>
import { io } from "socket.io-client";

export default {
  data() {
    return {
      price: null, // Veriyi burada saklıyoruz
    };
  },
  mounted() {
    // Backend'e bağlanıyoruz
    this.socket = io("http://localhost:5000"); // Backend'in çalıştığı URL

    // "priceUpdate" event'ini dinliyoruz
    this.socket.on("priceUpdate", (data) => {
      this.price = data.price; // Fiyatı state'e kaydediyoruz
    });
  },
  beforeDestroy() {
    // Component unmount olduğunda bağlantıyı kesiyoruz
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
/* Buraya sadece bu bileşene özel CSS yazabilirsiniz */
h1 {
  font-size: 2em;
  text-align: center;
  color: #333;
}
</style>
