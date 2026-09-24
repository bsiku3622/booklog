# Booklog

A small personal reading shelf built with Astro, React, and paper-ui.

## Run locally

```sh
pnpm install
pnpm dev
```

The shelf starts with a few example books. Add books, move them between reading states, and save a rating and review after finishing one. Data is stored in the current browser with `localStorage` and is not synced between devices.

## Install as an app

- Android: open the production site in Chrome and choose **Install app** or **Add to Home screen** from the browser menu.
- iPhone or iPad: open the production site in Safari, tap **Share**, then choose **Add to Home Screen**.

The service worker caches the app shell for offline opening. Changes to the shelf remain local to the browser that created them.
