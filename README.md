# Frontend Developer Assessment - Novacrust Labs

## Implemented Screen
The **Checkout Screen** – the core payment/conversion interface featuring:
- Bidirectional crypto amount conversion with real-time calculation
- Custom dropdowns with search functionality and keyboard navigation
- Animated tab switching (Framer Motion)
- Responsive design (mobile + desktop)
- Form validation and processing states

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons

## Setup
```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Key Features
- **Smart conversion**: Edit either "You pay" or "You receive" – the other updates automatically
- **Custom amount input**: Comma formatting, fixed decimals, precise cursor handling
- **Searchable dropdowns**: Crypto and wallet selectors with outside-click detection
- **Smooth animations**: Spring-based tab transitions
- **Responsive**: Matches Figma breakpoints for mobile and desktop

## Implementation Notes
- Conversion rates are mocked (production would use a live API)
- Focus on component reusability and clean state management
- Prioritized interaction polish over feature breadth within the time constraint
- Clean, matured architecture

---
**Demo**: [Link](https://crypto-checkout-omega.vercel.app/)
