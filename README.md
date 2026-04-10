# Kuidago V2

## What changed
- Radius now goes up to 50 miles
- Redeem reduces scarcity each time
- View Customer Experience and Join as Early Partner now scroll to live sections
- Early partner form is wired for email submission using FormSubmit

## Required step before it works
Open `src/App.jsx` and replace:

```js
const FORM_ENDPOINT = 'https://formsubmit.co/REPLACE_WITH_YOUR_EMAIL';
```

with your real email, for example:

```js
const FORM_ENDPOINT = 'https://formsubmit.co/hello@kuidago.com';
```

or

```js
const FORM_ENDPOINT = 'https://formsubmit.co/yourgmail@gmail.com';
```

Then push to GitHub and Vercel will redeploy.

## Notes
- The first submission to FormSubmit may require email confirmation from their service.
- After confirming, submissions will be emailed to you.
