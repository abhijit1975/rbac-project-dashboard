# 🌐 ProjectHub Core // Enterprise RBAC Dashboard Console

An advanced React frontend dashboard architecture designed for managing project deliverables with absolute **Role-Based Access Control (RBAC)** filters. Built using **React + TypeScript + Tailwind CSS (v4)**, the console implements modern context-driven state tracking alongside clean UI permission shields.

---

## 🚀 Quick Execution Deployment

Follow these terminal commands to initialize the development container loop on your machine:

1. **Navigate into the Project Root Directory Module:**
   ```bash
   cd ~/auth-crud-starter
   ```

2. **Grant Local Execution Flags to the Startup System Script:**
   ```bash
   chmod +x auth-crud-starter
   ```

3. **Execute the Core Automation Bootstrapper Routine:**
   ```bash
   ./auth-crud-starter
   ```

4. **Access the Interface Terminal Container Layer:**
   * Open your local system browser matrix and connect to: `http://localhost:5173`
   * *Bypass Tip:* If network loopbacks are restricted on your active configuration node, target the raw loop loop IP layer directly: `http://127.0.0.1:5173`

---

## 🔐 Simulated Authorization Accounts

The application contains a built-in **Client-Side Data Storage & Token Fallback Core** linked directly to browser `localStorage`. This allows full evaluation testing of creation forms, updates, data streams, and structural destructions seamlessly without needing a live backend container active.

To evaluate varying interface permission gates, use any password coupled with these exact case-insensitive handlers:

| Account ID | Profile Security Level Clearances | UI Authorization Rendering Actions |
| :--- | :--- | :--- |
| **`admin`** | **SEC_LEVEL_01 (Root Master Admin)** | Wide-clearance access lines. Full data logs visible. Granted exclusive `[ Purge ]` asset deletion button actions. |
| **`manager`** | **SEC_LEVEL_02 (Global Write Authority)** | Wide-clearance access lines. Full data logs visible. Granted modification form parameters. `[ Purge ]` buttons hidden. |
| **`user`** | **SEC_LEVEL_03 (Restricted Local Node)** | Tight sandbox parameters. Table grid automatically filters row assets down *only* to local records owned by the profile block. |

---

## 🏗️ System Folder Architecture Matrix

The code separation layout models production-grade frontend structures:

```text
src/
├── types/
│   └── auth.ts                # Strict compile-time interface data models
├── context/
│   └── AuthContext.tsx        # Shared state storage engine & permission models
├── components/
│   └── ProtectedRoute.tsx     # Route-guard boundaries mapping login tokens
├── services/
│   └── api.ts                 # fetch wrappers with integrated 401 interception
└── pages/
    ├── Login.tsx              # Deep Space authentication terminal
    ├── Dashboard.tsx          # Aurora Teal core tracking matrix table view
    ├── ProjectForm.tsx        # Context-safe data creation & change module
    └── ProjectDetail.tsx      # Diagnostic individual asset manifest explorer
```

---

## 🛠️ Key Architectural Assumptions & Safeguards

* **Client Security Layer Isolation (UI Guarding):** The console does not rely solely on backend API error parsing loops. Destructive buttons like `[ Purge ]` are completely omitted from the layout layers if a standard node identity profile is active.
* **Component Parameter Defenses:** The data update form module evaluates project property hashes on page assembly. If a restricted user forces navigation straight to `/projects/edit/:id` for an asset they do not own, form elements automatically switch to `disabled={isReadOnly}` and deploy an ambient warning alert.
* **Tailwind v4 Compile Optimization:** Implements the native `@tailwindcss/vite` compiling architecture framework to avoid legacy PostCSS configuration parsing deceleration, utilizing strict `bg-linear-to-r` and structured spacing variables.
