# **App Name**: Child Lens Landing

## Core Features:

- Header with Logo: Displays a centered logo in the header that shrinks on scroll with subtle animation. The logo is an image element that will take an image from an outside url.
- Hero Section - First Phrase: Displays the first static phrase, 'Children's health.' without animation.
- Hero Section - Second Phrase with Animated Words: Shows a dynamic phrase, 'Farther. Faster. Forward,' where each word fades in and out sequentially.
- Hero Section - Third Phrase: Presents a static description: 'The Child Lens is a platform for systemic change in children’s health. We build ventures from scratch, walk hand-in-hand with startups, and shift the perspectives of those in power — all to unearth the deep roots of systems that fail our children’s health.'
- Scroll Progress Bar: A thin progress bar at the top of the page indicates the user's scroll position.
- Smooth Scrolling: Enables smooth scrolling behavior when navigating to different sections of the page, with consideration for the sticky header.
- Animated Cursor: Replaces the native cursor with a custom circle that subtly grows on hover over interactive elements, controlled with requestAnimationFrame for performance.

## Style Guidelines:

- Primary color: Dark Gray (#222222) for text elements, providing a clean, elegant contrast against the white background.
- Background color: White (#FFFFFF) to maintain a minimalist and editorial feel.
- Accent color: Light Gray (#EEEEEE) for subtle UI elements and hover states to avoid harsh transitions.
- Body and headline font: 'Literata' serif, is similar to Times New Roman, for body and title text, emphasizing readability and maintaining elegance.
- The main content area will use a '.wrap' class with a max-width of 1200px and fluid padding, creating structured white space.  A simple grid will manage layout with ample spacing.
- Micro-interactions: subtle reveals with Intersection Observer, magnetic hover effects on CTAs, and a progress bar at the top of the page indicating scroll position.
- Cursor effect: a custom circular cursor that expands on hover over interactive elements, rendered at 60fps