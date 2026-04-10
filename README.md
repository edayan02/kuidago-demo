# Kuidago Vercel Ready

## Fastest way to get this live

### Option A: GitHub + Vercel
1. Download and unzip this folder.
2. Create a new GitHub repository named `kuidago-demo`.
3. Upload all files from this folder into that repo.
4. In Vercel, click **Add New Project**.
5. Import the GitHub repo.
6. Click **Deploy**.

Vercel should detect Vite automatically.

### Option B: Run locally first
Open Terminal / Command Prompt inside the folder and run:

```bash
npm install
npm run dev
```

### If you want to change restaurant data
Open:

```bash
src/App.jsx
```

Then edit the `const deals = [...]` section at the top.
