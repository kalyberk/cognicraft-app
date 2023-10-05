# CogniCraft

AI-assisted NFT creation platform. Mint an NFT, create your prompt and select an image out of 4 generations, then update your NFT with the new image. All on-chain. This project is built on top of [Thirdweb](https://thirdweb.com). Inspired by [NFT gated website](https://blog.thirdweb.com/guides/nft-gated-website).

Demo: [https://cognicraft.vercel.app](https://cognicraft.vercel.app/)

## Installation

### Environment Variables

Copy & fill env variables. To set up in local:

```bash
cp .env.example .env.local
```

- Generate your `THIRDWEB_SECRET_KEY` and `NEXT_PUBLIC_THIRDWEB_CLIENT_ID` on thirdweb's [dashboard](https://thirdweb.com/create-api-key).
- Check thirdweb's [guide](https://portal.thirdweb.com/auth/wallet-configuration) to set up `THIRDWEB_AUTH_PRIVATE_KEY`.

### Dependencies

Install dependencies:

```bash
  yarn
```

### Running the app

Start the development server:

```bash
  yarn dev
```

Build and start the production server:

```bash
  yarn build && yarn start
```

## Images

- To prevent excessive image generation, non-production environment will use random images from [Picsum](https://picsum.photos). Production environment uses OpenAI's image generation API, however if OpenAI credits are depleted, it will fallback to Picsum. You can change this behaviour in `src/pages/api/generate.ts`.

---

**_Additional Notes:_**

- This project is for demonstration purposes only, and CogniCraft's Sepolia testnet contracts are used. You may need some testnet tokens.
- Demo might not work well since it's consuming OpenAI's image generation API and requests are limited.
