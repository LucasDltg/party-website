![CI](https://github.com/LucasDltg/party-website/actions/workflows/ci.yml/badge.svg)
![Release](https://github.com/YOUR_USERNAME/YOUR_REPO/actions/workflows/release.yml/badge.svg)
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

## TODO

- Login improve (send email for verification, reset pswd, etc)
- Fix tag ci
- Fix contact page style
