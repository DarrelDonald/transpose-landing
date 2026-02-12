# Transpose — Landing Page

> Transpose your playing into notation.

## Local Development
Open `index.html` in a browser, or run a local server:
```bash
python -m http.server 8000
# or
npx serve .
```

## Deploy
This is a static site. Deploy to any static host:
- **Vercel:** `vercel --prod`
- **Netlify:** drag & drop the folder
- **GitHub Pages:** push to `gh-pages` branch

## Forms
Email signup, feedback, and interest tracking use Formspree. Replace the placeholder IDs in `index.html` and `js/main.js`:
- `YOUR_FORMSPREE_SIGNUP_ID` — email signup form. Create at https://formspree.io
- `YOUR_FORMSPREE_FEEDBACK_ID` — feedback survey form. Create at https://formspree.io
- `YOUR_FORMSPREE_INTEREST_ID` — "I Want This" click tracking. Create at https://formspree.io. Receives `action` and `timestamp` fields.
