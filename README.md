# Prithviraj's Portfolio

A modern, animated portfolio website built with React and Vite, showcasing projects, skills, certifications, and experience.

**Visit:** [prithviraj.codes](https://prithviraj.codes)

## ✨ Features

- **Smooth Animations**: Framer Motion integration for fluid UI transitions
- **Type Animation**: Dynamic text typing effects on the hero section
- **Particle Background**: Animated particle canvas for visual depth
- **Scroll Progress**: Visual indicator of page scroll position
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Multiple Sections**: Hero, About, Skills, Projects, Timeline, Certifications, Contact, and Resume
- **Web3 Forms Integration**: Contact form powered by Web3Forms
- **Loading Animation**: Custom preloader for better UX
- **Scroll Navigation**: Smooth scrolling between sections

## 🛠️ Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.2.11
- **Styling**: Tailwind CSS 3.4.4
- **Animations**: Framer Motion 11.1.7
- **Icons**: Lucide React 0.378.0
- **Forms**: Web3Forms React 1.1.3
- **Typography**: React Type Animation 3.2.0
- **Scrolling**: React Scroll 1.9.0
- **CSS Processing**: PostCSS, Autoprefixer

## 📁 Project Structure

```
src/
├── components/
│   ├── Footer.jsx           # Footer section
│   ├── Loader.jsx           # Loading animation
│   ├── Navbar.jsx           # Navigation bar
│   └── ScrollProgress.jsx   # Scroll progress indicator
├── sections/
│   ├── About.jsx            # About section
│   ├── Certifications.jsx   # Certifications showcase
│   ├── Contact.jsx          # Contact form
│   ├── Hero.jsx             # Hero/landing section
│   ├── Projects.jsx         # Projects portfolio
│   ├── Resume.jsx           # Resume modal
│   ├── Skills.jsx           # Technical skills
│   └── Timeline.jsx         # Experience timeline
├── styles/
│   └── index.css            # Global styles
├── App.jsx                  # Main app component
└── main.jsx                 # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Portfolio_Trial
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another available port).

## 📦 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Colors & Theme
Modify the Tailwind config in `tailwind.config.js` to customize colors and theme.

### Particle Animation
Edit the particle configuration in `src/sections/Hero.jsx` to adjust:
- Particle count
- Movement speed
- Colors
- Size

### Content
Update section content in the respective files within `src/sections/` folder.

## 📸 Assets

- **Certificates**: Place your certificate images in `public/certificates/`
- **Photos**: Add photos to `public/photos/`

## 🔗 Links

- **Portfolio Website**: [prithviraj.codes](https://prithviraj.codes)
- **Repository**: Check your git remote for the source code

## 📝 License

This project is personal portfolio. Feel free to use it as a template for your own portfolio.

## 🤝 Contact

For inquiries or opportunities, use the contact form on the portfolio website or reach out via [prithviraj.codes](https://prithviraj.codes).

---

Built with ❤️ using React, Vite, and Tailwind CSS
