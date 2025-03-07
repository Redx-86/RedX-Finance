require("dotenv").config();
const WebSocket = require("ws");

const SOCKET_URL = `${process.env.WEBSOCKET_URL}/btcusdt@trade`;
const ws = new WebSocket(SOCKET_URL);

ws.on("open", () => {
    console.log("Connected to Binance WebSocket");
});

ws.on("message", (data) => {
    const trade = JSON.parse(data);
    console.log(`BTC/USDT Price: ${trade.p}`);
});

ws.on("close", () => {
    console.log("Disconnected from WebSocket");
});

ws.on("error", (err) => {
    console.error("WebSocket error:", err);
});
