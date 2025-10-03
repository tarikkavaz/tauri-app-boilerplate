use tauri::menu::{MenuBuilder, MenuItemBuilder, PredefinedMenuItem, SubmenuBuilder};
use tauri::{Emitter, Manager};
use tauri::WebviewUrl;
use tauri::webview::WebviewWindowBuilder;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_notification::init())
    .plugin(tauri_plugin_os::init())
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // Build the native menu starting with default app menu
      let app_menu = SubmenuBuilder::new(app, "Tauri App")
        .item(
          &MenuItemBuilder::with_id("about", "About Tauri App Boilerplate")
            .build(app)?,
        )
        .separator()
        .item(&PredefinedMenuItem::hide(app, None)?)
        .item(&PredefinedMenuItem::hide_others(app, None)?)
        .item(&PredefinedMenuItem::show_all(app, None)?)
        .separator()
        .item(&PredefinedMenuItem::quit(app, None)?)
        .build()?;

      // Add Edit menu with standard editing operations
      let edit_menu = SubmenuBuilder::new(app, "Edit")
        .item(&PredefinedMenuItem::undo(app, None)?)
        .item(&PredefinedMenuItem::redo(app, None)?)
        .separator()
        .item(&PredefinedMenuItem::cut(app, None)?)
        .item(&PredefinedMenuItem::copy(app, None)?)
        .item(&PredefinedMenuItem::paste(app, None)?)
        .item(&PredefinedMenuItem::select_all(app, None)?)
        .build()?;

      // Add custom Navigate menu
      let navigate_menu = SubmenuBuilder::new(app, "Navigate")
        .item(
          &MenuItemBuilder::with_id("home", "Home")
            .accelerator("Cmd+1")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("clipboard", "Clipboard")
            .accelerator("Cmd+2")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("dialog", "Dialog")
            .accelerator("Cmd+3")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("filesystem", "File System")
            .accelerator("Cmd+4")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("notifications", "Notifications")
            .accelerator("Cmd+5")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("os-info", "OS Info")
            .accelerator("Cmd+6")
            .build(app)?,
        )
        .build()?;

      // Enhanced View menu with theme options
      let view_menu = SubmenuBuilder::new(app, "View")
        .item(
          &MenuItemBuilder::with_id("theme-light", "Light Theme")
            .accelerator("Cmd+L")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("theme-dark", "Dark Theme")
            .accelerator("Cmd+D")
            .build(app)?,
        )
        .item(
          &MenuItemBuilder::with_id("theme-system", "System Theme")
            .accelerator("Cmd+Shift+D")
            .build(app)?,
        )
        .separator()
        .item(&PredefinedMenuItem::fullscreen(app, None)?)
        .build()?;

      // Add Window menu with defaults
      let window_menu = SubmenuBuilder::new(app, "Window")
        .item(&PredefinedMenuItem::minimize(app, None)?)
        .item(&PredefinedMenuItem::maximize(app, None)?)
        .separator()
        .item(&PredefinedMenuItem::close_window(app, None)?)
        .build()?;

      // Build complete menu with all items
      let menu = MenuBuilder::new(app)
        .item(&app_menu)
        .item(&edit_menu)
        .item(&navigate_menu)
        .item(&view_menu)
        .item(&window_menu)
        .build()?;

      app.set_menu(menu)?;

      // Handle menu events
      app.on_menu_event(|app, event| {
        let id = event.id().as_ref();
        
        // Navigation events
        match id {
          "about" => {
            // Check if about window already exists
            if let Some(window) = app.get_webview_window("about") {
              let _ = window.set_focus();
            } else {
              // Create new about window
              let _ = WebviewWindowBuilder::new(
                app,
                "about",
                WebviewUrl::App("/about".into())
              )
              .title("About Tauri App Boilerplate")
              .inner_size(550.0, 850.0)
              .resizable(false)
              .minimizable(false)
              .maximizable(false)
              .center()
              .build();
            }
          }
          "home" => {
            let _ = app.emit("navigate", "/");
          }
          "clipboard" => {
            let _ = app.emit("navigate", "/clipboard");
          }
          "dialog" => {
            let _ = app.emit("navigate", "/dialog");
          }
          "filesystem" => {
            let _ = app.emit("navigate", "/filesystem");
          }
          "notifications" => {
            let _ = app.emit("navigate", "/notifications");
          }
          "os-info" => {
            let _ = app.emit("navigate", "/os-info");
          }
          // Theme events
          "theme-light" => {
            let _ = app.emit("set-theme", "light");
          }
          "theme-dark" => {
            let _ = app.emit("set-theme", "dark");
          }
          "theme-system" => {
            let _ = app.emit("set-theme", "system");
          }
          _ => {}
        }
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
