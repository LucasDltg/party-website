![CI](https://github.com/LucasDltg/party-website/actions/workflows/ci.yml/badge.svg)
![Release](https://github.com/LucasDltg/party-website/actions/workflows/release.yml/badge.svg)
![Version](https://img.shields.io/github/v/tag/LucasDltg/party-website?label=version)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Launch docker:

- docker load -i path/to/file
- docker run -it -p 3001:3000 lucas-website:latest

## Reminders

# Release

Push tags on github for major and minor versions changes. For convenience, tags should have format vX.X.X

Delete tag locally: git tag -d vX.X.X
Delete tag on remote: git push origin :refs/tags/vX.X.X

Create tag: git tag -a vX.X.X -m "Release vX.X.X"
Push tag: git push origin vX.X.X

# Scrips

Run

- npx ts-node .\src\scripts\setAdminClaim.ts: to set role for a user

## TODO

- Login improve (send email for verification, reset pswd, etc)
- weird login (no check)
- Fix contact page style
- Button to see password on /auth
- improve admin dashboard + localistion of ip
- bug redirection doesnt work if we click twice on connect

- Logging system (check if there is a problem of writing when logrotate change the file)
