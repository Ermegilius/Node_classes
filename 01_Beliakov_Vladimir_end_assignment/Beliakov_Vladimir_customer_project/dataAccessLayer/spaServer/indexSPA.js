import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const config = JSON.parse(fs.readFileSync(new URL("./configSPA.json", import.meta.url)));
const { port, host } = config;

// Create __dirname equivalent for ES modules
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();

// Serve static files from public directory
app.use(express.static(path.join(dirname, "public")));

// Serve the main SPA page from root
app.get("/", (req, res) => {
	res.sendFile(path.join(dirname, "public", "index.html"));
});

// Fallback route for SPA navigation
app.get("*", (req, res) => {
	res.sendFile(path.join(dirname, "public", "index.html"));
});

app.listen(port, host, () => {
	console.log(`SPA server running at http://${host}:${port}`);
});
