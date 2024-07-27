// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command};

#[tauri::command]
fn notify() {
    Command::new("notify-send")
        .arg("kek")
        .spawn()
        .expect("Failed to send desktop notification");

    println!("Notification sent");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![notify])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
