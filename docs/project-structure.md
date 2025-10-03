# Project Structure

```
tauri-app-boilerplate/
├── src/                      # Next.js frontend source
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Home page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── clipboard/        # Clipboard demo page
│   │   ├── dialog/           # Dialog demo page
│   │   ├── filesystem/       # File System demo page
│   │   ├── notifications/    # Notifications demo page
│   │   └── os-info/          # OS Info demo page
│   └── components/
│       └── Navigation.tsx    # Navigation component
├── src-tauri/                # Tauri backend (Rust)
│   ├── src/
│   │   ├── main.rs           # Tauri application entry
│   │   └── lib.rs            # Rust library code
│   ├── capabilities/
│   │   └── default.json      # Plugin permissions config
│   ├── Cargo.toml            # Rust dependencies & plugins
│   └── tauri.conf.json       # Tauri configuration
├── public/                   # Static assets
│   └── logo.svg              # App logo
├── package.json              # Node.js dependencies
└── tsconfig.json             # TypeScript configuration
```
