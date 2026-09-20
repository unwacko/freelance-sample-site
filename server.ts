import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), "data");
const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
}
if (!fs.existsSync(CONTACTS_FILE)) {
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), { mode: 0o600 });
}

app.get("/api/health", (req, res) => {
  res.json({ status: "secure" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { clientType, name, email, organizationName, serviceRequested, budget, message, webhookUrl } = req.body;
    
    if (!name || typeof name !== "string" || name.trim().length === 0 ||
        !email || typeof email !== "string" || !email.includes("@") ||
        !message || typeof message !== "string" || message.trim().length === 0) {
      return res.status(400).json({ success: false, error: "Invalid or missing required fields." });
    }

    const sanitizedContact = {
      id: "sub_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      submittedAt: new Date().toISOString(),
      clientType: clientType === "organization" ? "organization" : "individual",
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 150),
      organizationName: organizationName ? organizationName.trim().slice(0, 150) : "N/A",
      serviceRequested: serviceRequested ? serviceRequested.trim().slice(0, 100) : "General",
      budget: budget ? budget.trim().slice(0, 50) : "Not specified",
      message: message.trim().slice(0, 2000),
      status: "New"
    };

    // Save locally securely
    const fileData = fs.readFileSync(CONTACTS_FILE, "utf-8");
    const contacts = JSON.parse(fileData);
    contacts.unshift(sanitizedContact);
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), { mode: 0o600 });

    // Forward to Google Sheet Webhook URL (from environment or request payload)
    const targetWebhook = webhookUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (targetWebhook && typeof targetWebhook === "string" && targetWebhook.startsWith("https://")) {
      try {
        await fetch(targetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sanitizedContact),
          redirect: "follow"
        });
      } catch (webhookErr) {
        console.error("Google Sheet webhook forwarding error:", webhookErr);
      }
    }

    res.json({ success: true, message: "Inquiry successfully submitted and logged." });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Secure server running on port ${PORT}`);
  });
}

startServer();
