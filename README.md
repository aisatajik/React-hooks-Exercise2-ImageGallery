# Exercise 2 – Simple Image Gallery with an API

## Run the project

```bash
npm install
npm run dev
```

Then open the printed URL (usually http://localhost:5173).

## Using the Unsplash API (as suggested in the exercise)

1. Turn on a VPN, go to https://unsplash.com/oauth/applications and create an App.
2. Copy the `Access Key`.
3. Rename `.env.example` to `.env` and paste the key:
   ```
   VITE_UNSPLASH_KEY=your_access_key
   ```
4. Restart `npm run dev` (keep the VPN on while using the app).

If no key is set, the app uses the free Picsum Photos API (no key required).

## Features

- Fetches a list of images with `fetch` from the Unsplash API (or Picsum Photos)
- Shows the images in a simple grid
- "Load More" button: the first 9 images are shown, and each click adds 9 more
- `useState` stores the images and `useEffect` fetches data when the page loads

## Project structure

```
src/
├── main.jsx
├── App/
│   ├── index.jsx
│   └── app.module.scss
├── components/
│   ├── ImageCard/        (index.jsx, imageCard.module.scss)
│   ├── ImageGrid/        (index.jsx, imageGrid.module.scss)
│   ├── LoadMoreButton/   (index.jsx, loadMoreButton.module.scss)
│   └── Message/          (index.jsx, message.module.scss)
├── services/
│   └── imageApi.js
└── styles/
    ├── _variables.scss
    └── global.scss
```
