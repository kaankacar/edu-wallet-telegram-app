# EDU Wallet Telegram Mini App

## Overview

EDU Wallet is a Telegram Mini App that allows users to create and manage a wallet for EDU tokens on the Open Campus Codex Sepolia network. This app provides a user-friendly interface for creating wallets, sending and receiving EDU tokens, and viewing wallet balances.

Try the bot here: [https://t.me/EduWalletBot/eduwallet](https://t.me/EduWalletBot/eduwallet)

## Features

- Create a new EDU wallet
- View wallet balance
- Send EDU tokens to other addresses
- Receive EDU tokens (generate QR code for wallet address)
- Copy wallet address to clipboard
- Scan QR codes for easy address input

## Technology Stack

- React.js
- Ethers.js
- TailwindCSS
- react-qr-scanner

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/edu-wallet-telegram-app.git
   cd edu-wallet-telegram-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your RPC URL:
   ```
   REACT_APP_RPC_URL=https://open-campus-codex-sepolia.drpc.org
   ```

## Development

To run the app in development mode:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

To build the app for production:

```
npm run build
```

This will create a `build` folder with the production-ready app.

## Deployment

1. Deploy the built app to a hosting service of your choice (e.g., Netlify, Vercel, GitHub Pages).

2. Set up a Telegram Bot:
   - Create a new bot via BotFather on Telegram
   - Use the `/newapp` command to create a Web App for your bot
   - Set the Web App URL to the URL where you hosted your app

## Usage

1. Open the Telegram bot: [https://t.me/EduWalletBot/eduwallet](https://t.me/EduWalletBot/eduwallet)
2. Start the bot to access the EDU Wallet Mini App
3. Use the interface to create a wallet, send/receive EDU tokens, and manage your balance

## Security Considerations

This is a basic implementation and should not be used for managing large amounts of tokens without further security enhancements. Consider the following for a production environment:

- Implement proper key management and storage
- Add more robust error handling
- Implement proper transaction signing (possibly on a backend)
- Add more user feedback for operations
- Implement proper state management (e.g., with Redux)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Disclaimer

This app is for educational purposes only. Use at your own risk. The developers are not responsible for any loss of funds or other issues that may arise from using this application.