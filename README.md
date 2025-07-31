# 🔐 Cybersecurity Validation Automation System

**Domain:** [www.ToronTik.com](https://www.ToronTik.com)  
**Author:** Elkassem Nasr *(Charles)*  
**Contact:** elkassem@torontik.com

---

This project is a cross-platform **end-to-end cybersecurity validation automation system**. It continuously monitors system integrity and security posture from **4:00 AM to 8:00 PM** with:

- 🧪 C++ system-level security checks
- ⚙️ Node.js-based task scheduling
- 📊 Real-time web-based dashboard
- 🐧 Support for both **Windows** and **Linux**

---

## 📁 Project Structure

├── index.js # Node.js scheduler for security checks
├── server.js # Express server powering the dashboard
├── dashboard.html # Real-time log visualization UI
├── security_checks.cpp # Windows system validation (C++)
├── security_checks_linux.cpp # Linux system validation (C++)
└── cyberlog.txt / /var/log/cyberlog.txt # Security logs

---

## 🚀 Key Features

- Scheduled scans every 10 minutes (4:00 AM–8:00 PM)
- Suspicious process detection (e.g. `mimikatz`)
- Firewall check stubs (can be extended)
- Realtime log dashboard (color-coded status)
- Platform-independent architecture

---

## 🛠 Setup Instructions

### Requirements

- Node.js (v16+)
- C++ compiler (GCC / g++)
- npm packages: `express`, `node-cron`

Install dependencies:

```bash
npm install express node-cron
g++ security_checks.cpp -o security_checks.exe
node index.js
node server.js
g++ security_checks_linux.cpp -o security_checks
chmod +x security_checks
crontab -e
*/10 4-19 * * * /path/to/security_checks
node server.js
