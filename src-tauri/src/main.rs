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

struct SystemCommand {
    exec: String,
    args: Vec<String>
}

#[tauri::command]
fn run_command(command: &str) {
    let commands: HashMap<&str, SystemCommand> = HashMap::from([
        ("lock", SystemCommand {
            exec: "loginctl".to_string(),
            args: ["lock-session".to_string()].to_vec()
        }),
        ("reboot", SystemCommand {
            exec: "systemctl".to_string(),
            args: ["reboot".to_string()].to_vec()
        }),
        ("shutdown", SystemCommand {
            exec: "systemctl".to_string(),
            args: ["poweroff".to_string()].to_vec()
        }),
        ("log-out", SystemCommand {
            exec: "loginctl".to_string(),
            args: ["terminate-user".to_string(), "$USER".to_string()].to_vec()
        }),
    ]);

    if !commands.contains_key(command) {
        println!("Command does not exist");
        return;
    }

    let system_command = commands.get(command).unwrap();
    println!("Running command '{}'", system_command.exec);

    let mut command = Command::new(system_command.exec.clone());

    for arg in system_command.args.iter() {
        command.arg(arg);
    }

    command
        .spawn()
        .expect("Could not execute command");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![notify])
        .invoke_handler(tauri::generate_handler![run_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
