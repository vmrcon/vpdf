# Free Text to PDF Converter

A simple, powerful, and free web application to convert plain text and Markdown files into polished PDF documents. Built with React, Tailwind CSS, and modern web technologies.

**Live Demo:** [Deploy on Netlify](https://vpdf.netlify.app/)

---

## 🎯 Features

- **📝 Rich Text Editor** – Write and format your content with bold, italic, and underline support
- **📤 File Upload** – Upload `.txt`, `.md` and `.docx` files directly into the editor
- **🎨 PDF Generation** – Convert your text to professional PDF documents instantly
- **🔒 Privacy First** – All processing happens in your browser; no data is sent to servers
- **📱 Responsive Design** – Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast & Lightweight** – No backend required; instant conversions
- **🌐 Multi-Language Support** – Language selector for international users
- **💬 User Testimonials** – See what others think about vpdf
- **❓ FAQ Section** – Comprehensive answers to common questions
- **🍪 Cookie Consent** – GDPR-compliant cookie management

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Vite** | Lightning-fast build tool |
| **jsPDF** | PDF generation |
| **html2canvas** | HTML to canvas conversion |
| **Mammoth** | Engine for converting .docx to PDF |
| **Wouter** | Client-side routing |
| **Framer Motion** | Smooth animations |
| **shadcn/ui** | Pre-built UI components |
| **Quill.js** | Editor Rich-Text

---

## 📋 Project Structure

```
vpdf-react/
├── client/
│   ├── public/
│   │   └── images/           # Static assets
│   └── src/
│       ├── components/       # Reusable React components
│       │   ├── Navbar.tsx
│       │   ├── Editor.tsx
│       │   ├── Features.tsx
│       │   ├── FAQ.tsx
│       │   ├── Testimonials.tsx
│       │   ├── Notification.tsx
│       │   ├── CookieConsent.tsx
│       │   └── ui/          # shadcn/ui components
│       ├── hooks/           # Custom React hooks
│       │   └── useSpotlight.ts
│       ├── pages/           # Page components
│       │   └── Home.tsx
│       ├── lib/             # Utility functions
│       ├── contexts/        # React contexts
│       ├── App.tsx          # Root component
│       ├── main.tsx         # Entry point
│       └── index.css        # Global styles & theme
├── server/                  # Express server (static hosting)
├── shared/                  # Shared types & constants
├── package.json
├── vite.config.ts
├── tsconfig.json
├── netlify.toml            # Netlify configuration
└── DEPLOYMENT_GUIDE.md     # Deployment instructions
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 22+
- pnpm (recommended) or npm

## 📦 Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run TypeScript type checking |
| `pnpm format` | Format code with Prettier |

---

## 🎨 Design & Branding

The project was designed in Figma with a focus on simplicity and usability. Here's the design system:

![Figma Design](https://i.postimg.cc/Gp0NTyt1/Screenshot-2025-12-01-11-40-29-AM.png)

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Brand Main | `#F66767` | Primary buttons, navbar, accents |
| Brand Dark | `#262424` | Text, headings, footer |
| Brand Text | `#5F6368` | Body text, descriptions |
| Brand Light | `#FFF5F5` | Light backgrounds, hover states |
| White | `#FFFFFF` | Cards, editor background |

### Typography

- **Font Family:** Roboto (Google Fonts)
- **Weights:** 300 (light), 400 (regular), 500 (medium), 700 (bold)
- **Heading Scale:** Responsive `clamp()` for fluid typography

### Key Animations

- **Unlock Animation** – Padlock icon rotates and fades when content is added
- **Wave Effect** – Avatar group waves on testimonial button hover
- **Spotlight Effect** – Radial gradient follows mouse cursor across the page
- **Smooth Transitions** – All interactive elements have polished entrance/exit animations

---

## 🔧 Configuration

### Tailwind Configuration

Tailwind CSS is configured with custom brand colors in `client/src/index.css`. The theme uses CSS variables for easy customization:

```css
--color-brand-main: #F66767;
--color-brand-dark: #262424;
--color-brand-text: #5F6368;
```

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Made with ❤️ by João Leite**
