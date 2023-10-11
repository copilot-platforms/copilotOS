# CopilotOS

## Getting Started

1. Make sure you've got npx installed: `npm install -g npx`
2. Run `yarn`
3. Run `yarn dev` to develop locally

### Connecting with Copilot

If you'd like to host a custom page for yourself, follow these steps:

1. Generate a production API key.
2. Add your name to the PageName type in `src/types.d.ts`
3. Add an entry to the `API_KEYS` object with your name as the key and your API key as the value in `src/app/actions/getApiKey.ts`
4. Once you've restarted (or redeployed) Then visit /edit?name={yourName}
