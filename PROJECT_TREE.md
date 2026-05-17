# Project Structure

This document explains the directory structure of the Clickjacking Simulation Lab. The project is split into two separate Next.js applications to demonstrate the difference between secure and vulnerable environments.

```text
comsec/
│
├── README.md               # Main documentation and getting started guide
├── PROJECT_TREE.md         # This file, explaining the directory layout
│
├── web-a/                  # 🛡️ SECURE APPLICATION (Runs on Port 3001)
│   │                       # This app is protected against clickjacking.
│   │
│   ├── app/
│   │   ├── globals.css     # Global styles including Tailwind CSS imports
│   │   ├── layout.tsx      # The root HTML layout for web-a
│   │   ├── page.tsx        # The main payment portal UI (Target page)
│   │   │
│   │   └── simulator/
│   │       └── page.tsx    # The interactive Clickjacking Simulator Lab
│   │                       # Contains the Decoy UI (Claim Prize) and iframe
│   │
│   └── next.config.ts      # 🔒 CRITICAL FILE: Contains the security headers
│                           # (Content-Security-Policy & X-Frame-Options)
│                           # that block cross-origin framing.
│
└── web-b/                  # ⚠️ VULNERABLE APPLICATION (Runs on Port 3000)
    │                       # This app lacks clickjacking protection.
    │
    ├── app/
    │   ├── globals.css     # Global styles including Tailwind CSS imports
    │   ├── layout.tsx      # The root HTML layout for web-b
    │   ├── page.tsx        # The vulnerable Checking Account UI (Target page)
    │   │                   # Designed with emerald colors to distinguish it.
    │   │
    │   └── simulator/
    │       └── page.tsx    # The interactive Clickjacking Simulator Lab
    │
    └── next.config.ts      # 🔓 CRITICAL FILE: This config is empty.
                            # It does NOT implement security headers, meaning
                            # the app can be framed by any malicious site.
```

## Key Components to Compare

When studying this lab, you should focus on the differences between these specific files:

1. **`web-a/next.config.ts` vs `web-b/next.config.ts`**
   This is where the actual vulnerability lives. `web-a` configures the server to send `X-Frame-Options: SAMEORIGIN` and `Content-Security-Policy: frame-ancestors 'self'`, whereas `web-b` sends nothing, leaving the browser to permit cross-origin iframing.

2. **`web-a/app/page.tsx` vs `web-b/app/page.tsx`**
   These represent the sensitive target applications. They are built identically in structure but styled differently (Indigo vs Emerald) so you can easily tell which target you are currently attacking in the simulator.

3. **`app/simulator/page.tsx` (in both apps)**
   This is the attacker's simulated malicious website. It uses an `<iframe>` with adjustable opacity and a decoy UI (`z-index: 0`) underneath the iframe (`z-index: 10`) to perform the UI redressing attack.
