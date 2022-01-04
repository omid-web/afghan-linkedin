# Vue 3 Template

## About this project

Afghan linkedin where users can connect and empower one another.
Main 3 pages:
- Chat page, all users can chat with one another
- Connect page, all users can connect with another, by email and social media
- Idea page, user can post an idea for others to see

## Setup

### `.env`

Go to your [Firebase Project](https://console.firebase.google.com) and get your config file, then create a `.env` file with the following structure:

```bash
# Firebase Config
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
```

### `.firebaserc`

```json
{
  "projects": {
    "default": "your-project-name"
  }
}
```

### Development

```sh
# To run the local environment
yarn dev
```

### Build

```sh
# Build your project for production
yarn build
```

Then just upload your `dist/` folder to your cloud provider.

## Deployment

This app can be deployed at any server, but this is already preconfigured to deploy with firebase.

```sh
# Add firebase tools as a global package
yarn add global firebase-tools

# Login into firebase
firebase login

# After login just deploy
firebase deploy
```



