# Customization

## Native Menu Bar
This boilerplate includes a native menu bar with navigation and theme controls. The menu appears at the top of the screen on macOS and in the window on Windows/Linux.

**Features:**
- App menu (About, Hide, Quit)
- Edit menu (Undo, Redo, Cut, Copy, Paste, Select All)
- Navigate menu with keyboard shortcuts (⌘1-6)
- View menu with theme switching (⌘L, ⌘D, ⌘⇧D)
- Window menu (Minimize, Maximize, Close)

### Adding Native Menu Items

This guide explains how to add custom menu items to your Tauri app's native menu bar.

#### Overview

The menu system consists of three parts:
1. **Rust Backend** (`src-tauri/src/lib.rs`) - Creates menu structure and emits events
2. **React Frontend** (`src/components/MenuEventHandler.tsx`) - Listens to menu events
3. **Permissions** (`src-tauri/capabilities/default.json`) - Allows event communication

#### Adding a New Menu Item

##### Step 1: Add the Menu Item in Rust

Open `src-tauri/src/lib.rs` and locate the menu building section. Add your new menu item to an existing submenu or create a new one.

**Example: Adding to an Existing Menu**

```rust
let navigate_menu = SubmenuBuilder::new(app, "Navigate")
  .item(
    &MenuItemBuilder::with_id("home", "Home")
      .accelerator("Cmd+1")
      .build(app)?,
  )
  // ... other items ...
  
  // Add your new item here
  .item(
    &MenuItemBuilder::with_id("settings", "Settings")
      .accelerator("Cmd+,")  // Common shortcut for settings
      .build(app)?,
  )
  .build()?;
```

**Example: Creating a New Submenu**

```rust
let help_menu = SubmenuBuilder::new(app, "Help")
  .item(
    &MenuItemBuilder::with_id("documentation", "Documentation")
      .accelerator("Cmd+?")
      .build(app)?,
  )
  .item(
    &MenuItemBuilder::with_id("check-updates", "Check for Updates")
      .build(app)?,
  )
  .build()?;

// Add it to the main menu
let menu = MenuBuilder::new(app)
  .item(&app_menu)
  .item(&navigate_menu)
  .item(&view_menu)
  .item(&window_menu)
  .item(&help_menu)  // Add your new submenu
  .build()?;
```

##### Step 2: Handle the Menu Event

In the same file, add a handler for your menu item in the `app.on_menu_event()` section:

```rust
app.on_menu_event(|app, event| {
  let id = event.id().as_ref();
  
  match id {
    // ... existing handlers ...
    
    // Add your handler
    "settings" => {
      let _ = app.emit("navigate", "/settings");
    }
    "documentation" => {
      let _ = app.emit("open-external", "https://docs.yourapp.com");
    }
    "check-updates" => {
      let _ = app.emit("check-updates", ());
    }
    
    _ => {}
  }
});
```

##### Step 3: Listen for Events in React

Open `src/components/MenuEventHandler.tsx` and add a listener for your new event:

**Note:** Use generic type parameters (e.g., `listen<string>()`) instead of explicit type annotations to avoid TypeScript/ESLint errors. The event type is automatically inferred from the generic parameter.

```tsx
const setupListeners = async () => {
  try {
    const { listen } = await import("@tauri-apps/api/event");

    // Existing listeners...
    const unlistenNavigate = await listen<string>("navigate", (event) => {
      router.push(event.payload);
    });

    // Add your custom listener
    const unlistenExternal = await listen<string>("open-external", (event) => {
      window.open(event.payload, "_blank");
    });

    const unlistenUpdates = await listen("check-updates", () => {
      // Handle update check
      console.log("Checking for updates...");
    });
  } catch {
    // Not in Tauri environment
  }
};
```

##### Step 4: Clean Up Event Listeners

Don't forget to clean up your listeners when the component unmounts:

```tsx
return () => {
  if (unlistenNavigate) unlistenNavigate();
  if (unlistenTheme) unlistenTheme();
  if (unlistenExternal) unlistenExternal();
  if (unlistenUpdates) unlistenUpdates();
};
```

**Using Custom Types**

For events with specific value constraints, define a type for better type safety:

```tsx
// Define your custom type
type Theme = "dark" | "light" | "system";

// Use it with the listen function
const unlistenTheme = await listen<Theme>("set-theme", (event) => {
  setTheme(event.payload); // TypeScript knows payload is Theme type
});
```

#### Keyboard Shortcuts

**Platform-Specific Accelerators**

Use platform-appropriate shortcuts:

```rust
// macOS
.accelerator("Cmd+N")

// Cross-platform (automatically maps to Ctrl on Windows/Linux)
.accelerator("CmdOrCtrl+N")

// With modifiers
.accelerator("Cmd+Shift+N")
.accelerator("Alt+F4")
```

**Common Shortcuts**

- `Cmd+,` or `Ctrl+,` - Settings
- `Cmd+Q` or `Ctrl+Q` - Quit
- `Cmd+W` or `Ctrl+W` - Close Window
- `Cmd+N` or `Ctrl+N` - New
- `Cmd+?` or `F1` - Help

#### Predefined Menu Items

Tauri provides built-in menu items for common actions:

```rust
use tauri::menu::PredefinedMenuItem;

let app_menu = SubmenuBuilder::new(app, "App")
  .item(&PredefinedMenuItem::about(app, None, None)?)
  .separator()
  .item(&PredefinedMenuItem::hide(app, None)?)
  .item(&PredefinedMenuItem::hide_others(app, None)?)
  .item(&PredefinedMenuItem::show_all(app, None)?)
  .separator()
  .item(&PredefinedMenuItem::quit(app, None)?)
  .build()?;

let view_menu = SubmenuBuilder::new(app, "View")
  .item(&PredefinedMenuItem::fullscreen(app, None)?)
  .build()?;

let window_menu = SubmenuBuilder::new(app, "Window")
  .item(&PredefinedMenuItem::minimize(app, None)?)
  .item(&PredefinedMenuItem::maximize(app, None)?)
  .item(&PredefinedMenuItem::close_window(app, None)?)
  .build()?;
```

#### Menu Separators

Add visual separators between menu items:

```rust
let file_menu = SubmenuBuilder::new(app, "File")
  .item(&MenuItemBuilder::with_id("new", "New").build(app)?)
  .item(&MenuItemBuilder::with_id("open", "Open").build(app)?)
  .separator()  // Adds a horizontal line
  .item(&MenuItemBuilder::with_id("save", "Save").build(app)?)
  .build()?;
```

#### Permissions

If your menu items emit events, ensure `core:event:default` permission is in `src-tauri/capabilities/default.json`:

```json
{
  "permissions": [
    "core:default",
    "core:event:default",
    // ... other permissions
  ]
}
```

#### Best Practices

1. **Use Meaningful IDs**: Menu item IDs should be descriptive (e.g., `"open-settings"` not `"item1"`)

2. **Follow Platform Conventions**: 
   - On macOS, the first menu is the app menu with About, Hide, Quit
   - Use standard shortcuts (Cmd+, for settings, Cmd+? for help)

3. **Group Related Items**: Use submenus to organize related functionality

4. **Add Keyboard Shortcuts**: Power users appreciate keyboard shortcuts for common actions

5. **Handle Events Gracefully**: Always catch errors when emitting/listening to events

6. **Clean Up Listeners**: Prevent memory leaks by properly cleaning up event listeners

7. **Use Proper TypeScript Types**: 
   - Use generic type parameters: `listen<string>()` instead of `(event: any)`
   - Define custom types for constrained values (e.g., `type Theme = "dark" | "light" | "system"`)
   - Avoid `any` types to maintain type safety and pass ESLint checks

#### Example: Complete Menu Addition

Here's a complete example of adding a "Tools" menu with two items:

**Rust (`src-tauri/src/lib.rs`):**
```rust
// Create the menu
let tools_menu = SubmenuBuilder::new(app, "Tools")
  .item(
    &MenuItemBuilder::with_id("calculator", "Calculator")
      .accelerator("Cmd+K")
      .build(app)?,
  )
  .item(
    &MenuItemBuilder::with_id("terminal", "Terminal")
      .accelerator("Cmd+T")
      .build(app)?,
  )
  .build()?;

// Add to menu bar
let menu = MenuBuilder::new(app)
  .item(&app_menu)
  .item(&tools_menu)
  // ... other menus
  .build()?;

// Handle events
app.on_menu_event(|app, event| {
  match event.id().as_ref() {
    "calculator" => {
      let _ = app.emit("open-tool", "calculator");
    }
    "terminal" => {
      let _ = app.emit("open-tool", "terminal");
    }
    _ => {}
  }
});
```

**React (`src/components/MenuEventHandler.tsx`):**
```tsx
const unlistenTool = await listen<string>("open-tool", (event) => {
  const tool = event.payload;
  if (tool === "calculator") {
    router.push("/tools/calculator");
  } else if (tool === "terminal") {
    router.push("/tools/terminal");
  }
});
```

#### Troubleshooting

**Menu items visible but not working**
- Check that `core:event:default` permission is added
- Verify event names match between Rust emit and React listen
- Check browser console for errors

**Menu not appearing**
- Ensure `app.set_menu(menu)?` is called
- Check for Rust compilation errors
- Verify menu structure is valid

**Keyboard shortcuts not working**
- Use `CmdOrCtrl` for cross-platform shortcuts
- Avoid conflicts with system shortcuts
- Test on each platform

#### Learn More

- [Tauri Menu API Documentation](https://docs.rs/tauri/latest/tauri/menu/)
- [Tauri Events Documentation](https://v2.tauri.app/develop/calling-frontend/)
- [Keyboard Accelerator Syntax](https://docs.rs/tauri/latest/tauri/menu/struct.Accelerator.html)

## About Window
The boilerplate includes a custom About window that displays app information. You should customize it with your own details.

**To customize the About window:**

Edit `src/app/about/page.tsx` and update the following:

1. **App Name** (lines 37-39):
   ```tsx
   <h1 className="text-2xl font-bold text-white mb-2">
     Your App Name
   </h1>
   ```

2. **Version** (line 41):
   ```tsx
   <p className="text-blue-100 text-sm">
     Version 1.0.0
   </p>
   ```

3. **Description** (line 50):
   ```tsx
   <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
     Your app description here.
   </p>
   ```

4. **Authors** (line 66):
   ```tsx
   <div className="text-sm text-gray-900 dark:text-gray-100">
     Your Name
   </div>
   ```

5. **License** (line 81):
   ```tsx
   <div className="text-sm text-gray-900 dark:text-gray-100">
     Your License
   </div>
   ```

6. **Copyright** (line 96):
   ```tsx
   <div className="text-sm text-gray-900 dark:text-gray-100">
     Copyright © 2025 Your Name
   </div>
   ```

7. **Website** (lines 108-115):
   ```tsx
   <a
     href="https://your-website.com"
     target="_blank"
     rel="noopener noreferrer"
     className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
   >
     your-website.com
   </a>
   ```

The About window opens when clicking "About" in the app menu (macOS menu bar or window menu on other platforms).
