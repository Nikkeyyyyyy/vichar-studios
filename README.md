# Vichaar Studio - Digital Marketing Agency Website

A premium, highly-interactive website replica designed for "Vichaar Studio", a digital marketing and brand building agency. Built completely from scratch using modern web technologies to be lightning-fast, fully responsive, and visually engaging.

## 🌟 Key Features

The website focuses heavily on modern UI/UX design trends to maximize user engagement and conversion rates:

*   **Dark Mode Aesthetic:** A sleek, high-contrast dark theme with vibrant orange accent colors (`#FF6B35`) to create a professional and modern agency feel.
*   **Multi-Page Architecture:** 
    *   `index.html`: Main landing page with comprehensive agency overview.
    *   `service-instagram.html`: Detailed breakdown of organic Instagram growth strategies.
    *   `service-social-media.html`: Full-service social media management offerings.
    *   `service-content.html`: Data-driven content strategy and playbook features.
    *   `service-ads.html`: High-ROI paid Meta and Google ads management.
*   **Advanced Interactivity (No Frameworks):**
    *   **Glassmorphism Navigation:** The header utilizes a frosted-glass backdrop filter that becomes active on scroll.
    *   **Dynamic Scroll Reveals:** Elements smoothly fade and slide up as they enter the user's viewport using the `IntersectionObserver` API.
    *   **Animated Data Counters:** Numbers in the statistics section physically count up from zero to their target digits upon revealing.
    *   **Magnetic 3D Cards:** The service cards feature a complex 3D CSS tilt effect that tracks cursor coordinates, paired with a glowing background mesh.
*   **Serverless Contact Form:** The "Get In Touch" section utilizes AJAX fetch logic to submit messages directly to a Formspree endpoint without requiring page reloads or a backend server.

## 🛠 Tech Stack

This project was intentionally built without heavy frontend frameworks (like React or Vue) to ensure maximum performance, zero build-step requirements, and easy static hosting.

*   **HTML5:** Semantic structure and custom data attributes.
*   **CSS3:** Native CSS variables, Flexbox/Grid layouts, complex animations (`@keyframes`), and transform layering (`preserve-3d`).
*   **Vanilla JavaScript (ES6+):** Handling all DOM manipulations, API requests (AJAX), and scroll listeners.
*   **FontAwesome:** Iconography.
*   **Google Fonts:** Utilizing the 'Outfit' typeface system.

## 🚀 How to Run Locally

You don't need NodeJS or complex environments to run this project. 

1. **Clone the repository** or download the ZIP file.
2. Open the main project folder (`replica`).
3. Simply **double-click the `index.html`** file to open it in your default web browser!

*Optional (For live-reloading):*
If you have Node installed, you can run a local server:
```bash
npx serve . -l 3000
```
Then visit `http://localhost:3000` in your browser.

## 🌐 How to Deploy (GitHub Pages)

Because this is a static site, hosting is 100% free and takes less than 2 minutes.

1. Upload all files to a public GitHub repository.
2. In your repository on GitHub, navigate to the **Settings** tab.
3. Click on the **Pages** menu item on the left-hand sidebar.
4. Under the "Build and deployment" section -> Source, select **Deploy from a branch**.
5. Select the **main** branch and click **Save**.
6. GitHub will build your site, and inside 2 minutes it will be live at `https://[your-username].github.io/[repository-name]`.

## ⚙️ Configuration (Contact Form)

By default, the contact form on `index.html` submits to a specific Formspree ID.
To change where the emails are sent:

1. Create a free account at [Formspree.io](https://formspree.io/).
2. Create a new form to get your unique endpoint URL.
3. Open `index.html` and `script.js`.
4. Replace the existing `action="https://formspree.io/f/..."` URL with your new endpoint link.
