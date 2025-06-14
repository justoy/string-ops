# 🧰 String Ops App

A lightweight **Next.js 14** web app that lets you stack and execute string‑processing operations, e.g., un‑escapinging JSON blobs, pretty‑printing, URL‑decoding.

---

## ✨ Features

| Capability                           | Details                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------- |
| 🔧 **Composable pipeline**           | Pick operations from a dropdown, reorder with arrows, and run them in sequence. |
| ⚡ **Instant client‑side processing** | No server round‑trips—the whole pipeline runs in the browser.                   |
| 🛠️ **Extensible**                   | Add your own transforms by pushing a function to `BUILT_IN_OPS`.                |
| 🗄️ **Copy‑to‑clipboard**            | One‑click button to copy the final output.                                      |
| 🎨 **Tailwind + shadcn/ui**          | Production‑ready components with consistent theming.                            |

---

## 🚀 Quick start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you’re ready to experiment.

---

## 🧑‍💻 Usage

1. **Paste** or type your input string in the *Input* box.
2. **Add operations** from the dropdown (e.g., *Un‑escape JSON string*, *Beautify JSON*).
3. **Reorder** operations with the ▲▼ buttons as needed.
4. Click **Run** to execute the pipeline—results appear in the *Output* box.
5. Hit **Copy to clipboard** to grab the final text.

### Sample pipeline

Input (escaped):

```text
"{\"id\":123,\"url\":\"https%3A%2F%2Fexample.com%2Fitem%3Fref%3Dchat\"}"
```

Pipeline: *Un‑escape → Beautify → URL‑decode* → **Output** becomes nicely formatted JSON with a readable URL.

---

## 🏗️ Deploying

The app is 100 % client‑side, so Vercel (recommended), Netlify, or any static‑hosting service works:

1. Push to GitHub/GitLab.
2. Click **“Import Project”** on Vercel.
3. Accept defaults (no env vars needed).

Done—build & deploy in under a minute.

---

## 📄 License

MIT © 2025 Your Name
