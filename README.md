![CI](https://github.com/LucasDltg/party-website/actions/workflows/ci.yml/badge.svg)

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

# Tags

Push tags on github for major and minor versions changes. Patch are automatically changed according to number of commits. For convenience, tags should have format vX.x

## TODO

- Login improve (send email for verification, reset pswd, etc)
- Login not successful when api 404
- Translate all pages
- Fix transition home page

⚠ i18n configuration in next.config.ts is unsupported in App Router.
Learn more about internationalization in App Router: https://nextjs.org/docs/app/building-your-application/routing/internationalization
