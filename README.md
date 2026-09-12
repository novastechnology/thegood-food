# The Good Food Company — Official Website & Export Portal

[![Pure. Fresh. International](https://img.shields.io/badge/Export-India_to_GCC-2d6a4f.svg)](https://thegoodfoodcompany.com)
[![Certifications](https://img.shields.io/badge/APEDA%20%7C%20Spices%20Board%20%7C%20FSSAI%20%7C%20ISO-Certified-1b4332.svg)](certificates.html)
[![Compliance](https://img.shields.io/badge/GCC_Compliant-ESMA%20%7C%20MOCCAE-3d5a32.svg)](certificates.html)

Official web portal and bulk wholesale catalog for **The Good Food Company** — a premier agricultural export enterprise headquartered in Ahmedabad, India, specializing in high-volume export of fresh vegetables, premium rice varieties, pulses, and authentic whole raw spices to the United Arab Emirates, Saudi Arabia, and the wider GCC region.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Product Portfolio](#-product-portfolio)
- [Key Features](#-key-features)
- [Project Architecture & File Structure](#-project-architecture--file-structure)
- [Compliance & Certifications](#-compliance--certifications)
- [Getting Started & Local Development](#-getting-started--local-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Contact & Trade Desk](#-contact--trade-desk)

---

## 🌿 Overview

The Good Food Company bridges India's agricultural heartland directly with Middle Eastern supply chains. Operating from facilities near **Nhava Sheva (JNPT), Mumbai** and **Mundra Port, Gujarat**, we provide 3–7 day sea freight transit with unbroken cold chain integrity to major GCC ports including Jebel Ali, Jeddah, Dammam, Khalifa, Shuwaikh, Hamad, and Salalah.

---

## 📦 Product Portfolio

| Commodity | Varieties / Grades | Export Packaging | Reefer / Container Capacity |
| :--- | :--- | :--- | :--- |
| **Nashik Red Onions** | 45mm+, 55mm+ (Class 1 Export) | 25kg / 50kg Lennow Mesh Bags | ~29 MT (40ft Reefer) |
| **Pukharaj / Jyoti Potatoes** | 45mm to 60mm (Uniform, Firm Skin) | 50kg Jute / Mesh Bags | ~29 MT (40ft Reefer) |
| **G4 Garlic** | 40mm+, 50mm+ (Super Premium) | 10kg / 20kg Mesh Bags / Cartons | ~26–28 MT (40ft Reefer) |
| **Semi-Ripe Tomatoes** | Grade A (Stage 4–5 Color Index) | 10kg Plastic / Corrugated Crates | ~20–22 MT (40ft Reefer) |
| **Whole Raw Spices** | Cumin, Coriander, Fennel (ALL 3 Grade, 98–99% Purity) | 25kg / 50kg PP / Jute with LDPE Liner | ~17–20 MT (20ft FCL) |
| **Premium Rice & Pulses** | 1121 Basmati, Sona Masuri, Parboiled, Chickpeas, Lentils | 25kg / 50kg PP Woven Bags | ~24–26 MT (20ft FCL) |

---

## ✨ Key Features

- **Modern Responsive Design**: Clean, high-converting corporate layout tailored for wholesale B2B buyers and Gulf procurement desks.
- **Section 3.7 Our Story & Mission**: Story detailing farm-to-port logistics, complete commodity lines, and revised mission statement.
- **Partnership Standards Matrix**: Visual card boxes showcasing Strict Compliance, Bilingual Labelling, Export Logistics, and Assured Purity.
- **Interactive RFQ Request Form**: 4-step multi-attribute quotation form with Web3Forms integration.
- **Document Transparency & QA Protocol**: Interactive certification cards, full document packet details, and 5-step claims protocol.
- **Smooth UX & Motion**: Native Lenis smooth scrolling, scroll-progress indicator, and reactive viewport reveal animations.

---

## 📂 Project Architecture & File Structure

```text
thegood-food/
│
├── index.html            # Home page (Hero bento, stats ticker, core commodities, logistics summary)
├── about.html            # About Us (Our Story, Mission, Why Partner cards, Gulf logistics, Sustainability)
├── products.html         # Full bulk product catalog (Specifications, capacity metrics, order terms)
├── logistics.html        # Cold chain management (Temperature & humidity specs, port routes, QA protocol)
├── certificates.html     # Certifications & Registrations (APEDA, Spices Board, FSSAI, ISO, document pack)
├── faq.html              # Frequently Asked Questions (Logistics, QA, contracts, 5-step dispute protocol)
├── contact.html          # RFQ Quote Form (Corporate info, crop selection, sizing, container delivery)
├── wrangler.json         # Cloudflare Pages deployment configuration
│
├── css/
│   └── style.css         # Complete design system (CSS variables, responsive grids, dark accents, typography)
│
├── js/
│   └── script.js         # Navigation toggle, scroll progress, animated counters, Lenis integration
│
└── images/
    ├── logo.png          # Company emblem and branding
    ├── hero-bg.jpg       # High-resolution hero background
    ├── about-banner.jpg  # About page header banner
    ├── our-story.jpg     # Agricultural processing & export packing facility photograph
    └── products/         # High-definition commodity photos
        ├── onion.jpg
        ├── potato.jpg
        ├── garlic.jpg
        ├── tomato.jpg
        ├── spices.jpg
        └── rice.jpg
```

---

## 📜 Compliance & Certifications

All consignments adhere strictly to international and Gulf statutory food standards:

- **APEDA Registration**: Authorized export registration for Indian agricultural goods.
- **Spices Board of India**: Mandatory CRES registration verifying spice export compliance.
- **FSSAI License**: Food safety and handling license from the Government of India.
- **Phytosanitary Certification**: Government-issued pest-free and fumigation clearance.
- **Certificate of Origin**: Chamber of Commerce attestation for zero/preferential tariff entry under CEPA.
- **ISO 9001 & ISO 22000**: International quality and food safety management systems.
- **HACCP & Global G.A.P.**: Preventive hazard control and ethical farm practices.
- **GCC Bilingual Labeling**: English & Arabic production/expiry dates, origin, and storage compliance for Dubai Municipality, MOCCAE, and SFDA.

---

## 🚀 Getting Started & Local Development

No complex build pipeline required. This project runs directly in any modern browser or lightweight HTTP server.

### Option 1: Python Built-in Server (Recommended)
```bash
# 1. Clone repository
git clone https://github.com/novastechnology/thegood-food.git
cd thegood-food

# 2. Start local server
python -m http.server 3000

# 3. Open in browser
# http://localhost:3000
```

### Option 2: Node.js / `npx serve`
```bash
npx serve .
```

### Option 3: VS Code Live Server
- Open the project directory in **VS Code**.
- Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deployment

### Cloudflare Pages (Recommended)
This repository contains a ready `wrangler.json` file. To deploy directly using Wrangler:
```bash
npx wrangler pages deploy .
```

---

## 👥 Contributing

1. Fork the repository: `https://github.com/novastechnology/thegood-food`
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add feature description"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**.

---

## 📞 Contact & Trade Desk

- **Head Office**: 612, Shilp One, Shilaj Cross Road, Shilaj, Ahmedabad - 380059, Gujarat, India
- **Export Desk Email**: [info@thegoodfoodcompany.com](mailto:info@thegoodfoodcompany.com)
- **Phone**: +91 99252 75921
- **WhatsApp Desk**: [+91 89808 05921](https://wa.me/918980805921)
- **Loading Ports**: Nhava Sheva (JNPT), Mumbai · Mundra Port, Gujarat

---

*© 2026 The Good Food Company. All rights reserved. APEDA & Spices Board Registered Exporter.*
