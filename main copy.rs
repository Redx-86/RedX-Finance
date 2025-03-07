use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};
use futures_util::{StreamExt, SinkExt};
use serde_json;

#[tokio::main]
async fn main() {
    // Correct URL for Binance Futures WebSocket stream
    let url = "wss://fstream.binance.com/ws/btcusdt@aggTrade";  // Updated URL
    let (mut socket, _) = connect_async(url)
        .await
        .expect("Failed to connect to WebSocket");

    println!("Connected to Binance WebSocket");

    while let Some(Ok(msg)) = socket.next().await {
        match msg {
            Message::Text(text) => {
                // Parse the incoming text message
                let price_data: serde_json::Value = serde_json::from_str(&text).unwrap();
                let price = price_data["p"].as_str().unwrap(); // "p" for price data
                println!("Current BTC/USDT price: {}", price);
            }
            _ => (), // Ignore other message types
        }
    }
}
