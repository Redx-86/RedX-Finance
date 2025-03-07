use tokio_tungstenite::{connect_async, tungstenite::protocol::Message};
use futures_util::StreamExt;
use serde_json;

#[tokio::main]
async fn main() {
    let url = "ws://fstream.binance.com/ws/btcusdt@aggTrade"; // Binance Futures için doğru URL
    let (mut socket, _) = connect_async(url)
        .await
        .expect("WebSocket'a bağlanırken hata oluştu");

    println!("Binance WebSocket'a bağlanıldı");

    while let Some(Ok(msg)) = socket.next().await {
        match msg {
            Message::Text(text) => {
                let price_data: serde_json::Value = serde_json::from_str(&text).unwrap();
                let price = price_data["p"].as_str().unwrap();
                println!("Güncel BTC/USDT fiyatı: {}", price);
            }
            _ => (),
        }
    }
}
