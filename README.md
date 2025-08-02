# 🎓 Student ERP - School Management System

A modern, responsive Progressive Web Application (PWA) built with Next.js 14 and React 18 for comprehensive student management. Features a mobile-first design with dark/light theme support and push notifications.

![Student ERP Dashboard](https://img.shields.io/badge/Next.js-14.2.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 📱 **Core Functionality**
- **Dashboard**: Real-time overview of student activities
- **Assignments**: Track and manage homework submissions
- **Timetable**: Weekly class schedule with teacher details
- **Results**: Academic performance with interactive charts
- **Attendance**: Track attendance with visual analytics
- **Notices**: Important announcements and updates
- **Fee Management**: Payment tracking and history
- **Profile**: Student information and achievements
- **Search**: Global search across all modules

### 🎨 **UI/UX Features**
- **Mobile-First Design**: Optimized for all screen sizes
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Charts**: Interactive data visualization with Recharts
- **Modern UI Components**: Built with shadcn/ui and Radix UI

### 📲 **PWA Features**
- **Offline Support**: Service worker for offline functionality
- **Push Notifications**: Real-time updates and alerts
- **Install Prompt**: Add to home screen functionality
- **App-like Experience**: Standalone display mode
- **Fast Loading**: Optimized performance and caching

## 🚀 Quick Start

### Prerequisites
* Node.js v18.0 or higher
* NPM or Yarn package manager

### Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd student-erp-app
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```
    Open your browser and navigate to `http://localhost:3000`.


### Build for Production
To create a production-ready build and start the server, run the following commands:
```bash
# 1. Build the application for production
npm run build

# 2. Start the production server
npm start
```

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14.2.5**: React framework with App Router
- **React 18.2.0**: UI library with latest features
- **TypeScript 5**: Type-safe development
- **Tailwind CSS 3.3**: Utility-first CSS framework

### **UI Components**
- **shadcn/ui**: Modern component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Smooth animations

### **Data Visualization**
- **Recharts**: Interactive charts and graphs
- **Custom Analytics**: Attendance and performance tracking

### **PWA & Performance**
- **Service Worker**: Offline functionality
- **Web App Manifest**: Native app experience
- **Push Notifications**: Real-time alerts
- **Optimized Images**: Next.js image optimization

## 📱 PWA Features

### Installation
The app can be installed on any device:
- **Desktop**: Chrome, Edge, Safari
- **Mobile**: Android, iOS
- **Tablet**: All modern browsers

### Offline Support
- **Cached Pages**: All main pages work offline
- **Data Persistence**: Local storage for critical data
- **Background Sync**: Sync when connection restored

### Push Notifications
- **Send Notification**: PWA setup


## 📊 Features Overview

### 📚 **Academic Management**
- **Assignment Tracking**: Due dates, submissions, progress
- **Grade Management**: Results with visual charts
- **Attendance Monitoring**: Real-time tracking with analytics
- **Schedule Management**: Weekly timetable with notifications

### 💰 **Financial Management**
- **Fee Structure**: Detailed breakdown of all fees
- **Payment History**: Transaction records and receipts
- **Payment Status**: Real-time payment tracking
- **Due Alerts**: Automated payment reminders

### 📢 **Communication**
- **Notice Board**: Important announcements
- **Push Notifications**: Real-time alerts
- **Search Functionality**: Find any information quickly
- **Profile Management**: Student information hub


## 📱 Mobile Optimization

### Responsive Design
- **Mobile-First**: Optimized for 320px+ screens
- **Touch-Friendly**: 44px minimum touch targets
- **Gesture Support**: Swipe navigation and interactions
- **Safe Areas**: Support for device notches and home indicators

### Performance
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Reduced bundle sizes
- **Caching Strategy**: Aggressive caching for better performance

## 🧪 Testing

### Manual Testing
```bash
# Test PWA features
npm run build
npm start
# Open DevTools > Application > Service Workers
```

### Lighthouse Audit
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
- **Netlify**: Drag and drop `out` folder
- **GitHub Pages**: Static export
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

**Installation Problems:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

**PWA Not Working:**
- Check HTTPS requirement
- Verify service worker registration
- Clear browser cache

**Theme Not Switching:**
- Check localStorage permissions
- Verify theme provider setup


## 🙏 Acknowledgments

- **Next.js Team**: Amazing React framework
- **Vercel**: Excellent hosting platform
- **shadcn**: Beautiful UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

---

<div align="center">

**Built with ❤️ for students and educators**



</div>
