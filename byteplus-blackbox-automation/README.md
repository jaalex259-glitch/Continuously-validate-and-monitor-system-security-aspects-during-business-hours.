# BytePlus + BlackBox Automation

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```bash
BYTEPLUS_API_KEY=your_byteplus_api_key_here
BLACKBOX_API_KEY=bb_your_blackbox_key_here
BYTEPLUS_ENDPOINT=https://ark.cn-beijing.volcengine.com/api/v3/chat/completions

# Optional
NODE_ENV=development
LOG_LEVEL=info
REQUEST_TIMEOUT=30000
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Type check only
npm run typecheck
```

## 📁 Project Structure

```
byteplus-blackbox-automation/
├── src/
│   ├── index.ts          # Entry point
│   ├── services/
│   │   ├── byteplus.ts   # BytePlus API client
│   │   └── blackbox.ts   # BlackBox API client
│   ├── utils/
│   │   ├── logger.ts     # Logging utility
│   │   └── config.ts     # Config loader
│   └── types/
│       └── index.ts      # TypeScript interfaces
├── tests/
├── dist/                 # Compiled output (auto-generated)
├── .env                  # Environment variables (DO NOT COMMIT)
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🛠️ Scripts

- `npm run dev` - Run with ts-node in development mode
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled JavaScript from dist/
- `npm run typecheck` - Check types without emitting files
