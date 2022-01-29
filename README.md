# Yellow pages for fghan professionals and businesses


## TODO

- add share buttons to the proffesional and business cards.
- add skeleton to loading pages
- add notification toast after user adds/edits their information
- make site behave less janky when loggin for first time

## About this project

A site where Afghans can find one another and support one another by adding themselves as a contact and their business.
Only registered users can add a limit of 1 professional and 1 business, they can edit their profile from the top-right profile dropdown.

Main pages are:
- Professional
- Businesses directory
- Profile (logged in user can edit their proffesional card)
- Business (logged in user can edit their business card)

## Technology

Firebase was used for authentication and storage to keep this project simple.

https://github.com/afghan-tech-bro/afghan-linkedin-api
An expressJs api was used solely for the logged in user to add import their info from linkedin.


## Setup

Be sure to setup allowed env prefixes in `vite.config.ts`

`.env.development` and `.env.production` are env files used for local dev and build mode respectively by Vite.

Go to your [Firebase Project](https://console.firebase.google.com) and get your config file, then create a `.env` file with the following structure:

### `.env`
```bash
# Firebase Config
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
# Linkedin Api
LINKEDIN_CLIENT_ID=""
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



