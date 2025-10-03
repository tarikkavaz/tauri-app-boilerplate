# Tauri Plugins & Demo Pages

This boilerplate comes with several pre-configured Tauri plugins, each with an interactive demo page to help you understand their capabilities:

## Clipboard Manager
**Plugin:** `@tauri-apps/plugin-clipboard-manager`  
**Demo:** `/clipboard`

Interact with the system clipboard to read and write text or HTML content.
- `writeText(text)` - Write plain text to clipboard
- `readText()` - Read text from clipboard  
- `writeHtml(html)` - Write HTML to clipboard
- `clear()` - Clear clipboard content

## Dialog
**Plugin:** `@tauri-apps/plugin-dialog`  
**Demo:** `/dialog`

Display native system dialogs for file selection and user interaction.
- `open()` - Open file/directory picker
- `save()` - Save file dialog
- `message()` - Show information message
- `ask()` - Ask yes/no question
- `confirm()` - Confirmation dialog

## File System
**Plugin:** `@tauri-apps/plugin-fs`  
**Demo:** `/filesystem`

Access and manipulate the file system with secure, sandboxed operations.
- `readTextFile()` / `readTextFileLines()` - Read file contents
- `writeTextFile()` - Write text to file
- `readDir()` - List directory contents
- `exists()` - Check if path exists
- `remove()` - Delete files/directories
- `mkdir()` - Create directories
- `stat()` - Get file metadata

## Notifications
**Plugin:** `@tauri-apps/plugin-notification`  
**Demo:** `/notifications`

Send native desktop notifications to the user.
- Configure title, body, and icon
- Request notification permissions
- Display system notifications

## OS Information
**Plugin:** `@tauri-apps/plugin-os`  
**Demo:** `/os-info`

Retrieve system and platform information.
- `platform()` - Get OS platform (darwin, linux, windows)
- `version()` - Get OS version
- `osType()` - Get OS type
- `arch()` - Get CPU architecture
- `family()` - Get OS family (unix, windows)
- `hostname()` - Get system hostname
- `locale()` - Get system locale

All plugins are properly configured with permissions in `src-tauri/capabilities/default.json`. Visit the demo pages in the running app to see interactive examples of each plugin's capabilities.
