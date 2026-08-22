const { spawn } = require("child_process");

function startCloudflare() {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "npx",
      ["--yes", "cloudflared", "tunnel", "--url", "http://127.0.0.1:8081"],
      { stdio: ["ignore", "pipe", "pipe"], shell: true }
    );

    let settled = false;
    const onData = (buf) => {
      const text = buf.toString();
      process.stderr.write(text);
      const match = text.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/i);
      if (match && !settled) {
        settled = true;
        resolve({ url: match[0], child });
      }
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("error", reject);
    child.on("exit", (code) => {
      if (!settled) reject(new Error("cloudflared exited " + code));
    });
  });
}

async function main() {
  console.log("Starting Cloudflare tunnel for Expo...");
  const { url, child: tunnel } = await startCloudflare();
  console.log("\nTunnel URL: " + url);
  console.log("In Expo Go, open Enter URL manually and type:");
  console.log("  exp://" + url.replace(/^https?:\/\//, "") + "\n");

  const expo = spawn("npx", ["expo", "start", "--lan"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, EXPO_PACKAGER_PROXY_URL: url },
  });

  const shutdown = () => {
    tunnel.kill();
    expo.kill();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  expo.on("exit", (code) => {
    tunnel.kill();
    process.exit(code ?? 0);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
