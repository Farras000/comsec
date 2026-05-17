# Clickjacking Simulation Lab

This project is an educational demonstration of a **Clickjacking (UI Redressing)** attack and how to prevent it using modern web security headers.

It consists of two Next.js applications:
1. **web-a (Protected Website)**: A secure application that properly implements clickjacking protections.
2. **web-b (Vulnerable Website)**: A vulnerable application that lacks necessary security headers.

Both applications feature a "Clickjacking Simulator" page where you can experiment with the attack.

---

## 🚀 Getting Started

### Prerequisites
- Node.js & Bun installed on your machine.

### Running the Applications

You need to run both applications simultaneously on different ports.

**1. Start the Vulnerable App (web-b) on Port 3000:**
```bash
cd web-b
bun install
bun run dev
```

**2. Start the Secure App (web-a) on Port 3001:**
Open a new terminal window:
```bash
cd web-a
bun install
bun run dev -- -p 3001
```

---

## 🎯 How to Simulate the Attack

The goal of a clickjacking attack is to trick a user into clicking a button on a hidden, invisible iframe containing the target website, while they think they are interacting with the visible decoy interface.

### Testing the Vulnerable Application (web-b)
1. Open your browser and navigate to the simulator on the vulnerable app: `http://localhost:3000/simulator`
2. The simulator is designed to frame the vulnerable target site (which is running on the same port by default).
3. Use the **Opacity Slider** on the left side to adjust the visibility of the framed target.
4. Set the opacity to **0.5** to see how the attacker aligns their decoy "CLAIM PRIZE NOW" button exactly over the target's "Confirm Payment" button.
5. Set the opacity to **0 (Invisible)** and click the "CLAIM PRIZE NOW" button.
6. Notice that the click actually registers on the hidden iframe, processing the payment!

### Testing the Secure Application (web-a)
1. Open the simulator on the secure app: `http://localhost:3001/simulator`
2. By default, this frames `http://localhost:3001`. Because it's framing itself on the same origin, the `SAMEORIGIN` policy allows it. 
3. **To see the defense in action:** Change the "Target Website URL" in the simulator to frame the secure app from a different origin (e.g., from `web-b`). 
   - Go to `http://localhost:3000/simulator` (web-b) and try to frame `http://localhost:3001` (web-a).
   - You will see the iframe refuses to load. The browser console will show a security violation because `web-a` restricts who can frame it.

---

## 🛡️ The Defense: Security Headers

If you look at the source code, you'll see why `web-a` is secure and `web-b` is vulnerable.

In **web-a (`next.config.ts`)**, the following headers are implemented globally:

```typescript
{
  key: "Content-Security-Policy",
  value: "frame-ancestors 'self'", // Modern protection (HTML5)
},
{
  key: "X-Frame-Options",
  value: "SAMEORIGIN", // Legacy protection (Older browsers)
}
```

- `X-Frame-Options: SAMEORIGIN` ensures the page can only be displayed in a frame on the exact same origin as the page itself.
- `Content-Security-Policy: frame-ancestors 'self'` is the modern, more robust equivalent that tells the browser not to render the page inside iframes hosted by external domains.

In **web-b**, these headers are missing, leaving it completely vulnerable to UI redressing.

---

## ⚠️ Disclaimer
This project is built for educational and research purposes only. Always implement proper security headers on production web applications.
