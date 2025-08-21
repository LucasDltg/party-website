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

git tag -d v1.0.0; git push origin :refs/tags/v1.0.0; git tag -a v1.0.0 -m "Release v1.0.0"; git push origin v1.0.0

# Scrips

Run

- npx ts-node .\src\scripts\setAdminClaim.ts: to set role for a user
- npx ts-node .\src\scripts\encodeBase64.ts: to get the base 64 version of a string

# Logs

Logs are written in console (should only be used on server side), so docker can archive them

Logs are kept in memory using rolling buffer so serve admin page

## TODO

- Login improve (send email for verification, reset pswd, etc)
- weird login (no check)
- Verify token for pages with cookies
- Refresh firebase token
- AuthGuard correct ? (no render for unauth user ?, check getServerSideProps)

- Fix contact page style

- improve admin dashboard + localistion of ip
- Log people connected in RT
- Protect api routes

- Profile for people, allow adding image, change name, see profile through /profile/{name}
