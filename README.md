# Rebels Products

This project is a product website featuring product listings, wishlist functionality, and product search capabilities.
It's built using a modern tech stack and emphasizes maintainability through comprehensive testing.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [TanStack Router](https://tanstack.com/router)
- **Testing:**
  - [Vitest](https://vitest.dev/)
  - [Playwright](https://playwright.dev/)

## Project Overview

This website allows users to browse a catalog of products, search for specific products, view product details, and manage their wishlists. The key features include:

- **Product Listing:** Displays a catalog of products with images.
- **Product Search:** Enables users to search for products by name.
- **Product Details:** Provides information about individual products.
- **Wishlist:** Enables users to add and remove products from a personal wishlist.
- **Responsive Design:** The website is designed to be responsive and work seamlessly across different devices.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or higher recommended)
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/NillsvanLimbeek/rebels-products.git
   ```

2. Navigate to the project directory:

   ```bash
   cd rebels-products
   ```

3. Copy the `.env.example` file to `.env` and update the values with your environment variables.

   ```bash
   cp .env.example .env
   ```

4. Install dependencies:

   ```bash
   pnpm install
   ```

### Development

1. Start the development server:

   ```bash
   pnpm run dev
   ```

   This will start the development server and json-server as the backend server.

### Testing

#### Unit and Integration Tests (Vitest)

```bash
pnpm test:vitest
```

#### E2E Tests (Playwright)

```bash
pnpm test:playwright
```

### Future Improvement

- **Notification System**: Implement a user-friendly notification system to provide clear feedback after specific actions (e.g., adding to wishlist, successful search).
- **Improve Wishlist Playwright Testing**: Enhance the Playwright end-to-end tests to thoroughly cover the wishlist functionality, including adding, removing. Make more use of Playwright's mocking capabilities
- **Image Caching**: Optimize image loading performance by implementing caching using a library like TanStack Query.
- **State Management**: Migrate from React Context to a more robust state management solution like Zustand for improved code structure and maintainability.
