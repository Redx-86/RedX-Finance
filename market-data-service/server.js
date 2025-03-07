require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const WebSocket = require("ws");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app); // HTTP server oluşturuluyor
const io = socketIo(server); // socket.io server'ı başlatılıyor

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const BINANCE_API_URL = process.env.BINANCE_API_URL;

// WebSocket server'ını başlatıyoruz
const wss = new WebSocket.Server({ server });

wss.on("connection", (clientWs) => {
  console.log("Client connected");

  const binanceWs = new WebSocket(`${process.env.WEBSOCKET_URL}/btcusdt@trade`);

  binanceWs.on("message", (data) => {
    const trade = JSON.parse(data);
    // Binance'tan gelen veriyi Socket.IO ile frontend'e gönderiyoruz
    io.emit("priceUpdate", { price: trade.p });
  });

  clientWs.on("close", () => {
    console.log("Client disconnected");
    binanceWs.close();
  });
});

// REST endpoint
app.get("/price/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await axios.get(`${BINANCE_API_URL}?symbol=${symbol.toUpperCase()}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching price data" });
  }
});

// Server'ı başlatıyoruz
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
