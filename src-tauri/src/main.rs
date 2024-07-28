// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::collections::HashMap;
use std::process::Command;

#[tauri::command]
fn notify() {
    Command::new("notify-send")
        .arg("kek")
        .spawn()
        .expect("Failed to send desktop notification");

    println!("Notification sent");
}

#[tauri::command]
fn run_command(command: &str) {
    let commands = HashMap::from([
        ("lock", "loginctl lock-session"),
        ("reboot", "systemctl reboot"),
        ("shutdown", "systemctl poweroff"),
        ("log-out", "loginctl terminate-user $USER"),
    ]);

    if !commands.contains_key(command) {
        println!("Command does not exist");
        return;
    }

    let system_command = commands.get(command);
    println!("Running command '{}'", system_command.unwrap());
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![notify])
        .invoke_handler(tauri::generate_handler![run_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
