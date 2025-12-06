import dns from "dns";
import https from "https";
import { exec } from "child_process";

export default function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ status: "error", message: "URL missing" });
  }

  const cleanUrl = url.replace(/^https?:\/\//, "");

  // STEP 1: DNS Lookup (checks if domain exists)
  dns.lookup(cleanUrl, (err) => {
    if (err) {
      return res.json({
        status: "disconnected",
        ping: "N/A",
        reason: "DNS lookup failed",
      });
    }

    // STEP 2: HTTPS Request (checks if reachable)
    const start = Date.now();

    https
      .get(`https://${cleanUrl}`, (response) => {
        const ping = Date.now() - start;

        // STEP 3: PING using shell (Vercel supports child_process)
        exec(`ping -c 1 ${cleanUrl}`, (error, stdout) => {
          let pingTime = ping;

          if (!error && stdout.includes("time=")) {
            pingTime = stdout.split("time=")[1].split(" ms")[0];
          }

          return res.json({
            status: "connected",
            ping: pingTime,
          });
        });
      })
      .on("error", () => {
        return res.json({
          status: "disconnected",
          ping: "N/A",
          reason: "HTTPS request failed",
        });
      });
  });
}
