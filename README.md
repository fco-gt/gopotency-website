# GoPotency Documentation Website

This repository contains the source code for the official [GoPotency](https://github.com/fco-gt/gopotency) documentation website, built with [Starlight](https://starlight.astro.build/) and [Astro](https://astro.build/).

## 🚀 Getting Started

To run the documentation site locally, follow these steps:

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/fco-gt/gopotency-website.git
    cd gopotency-website
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Start the development server**:
    ```bash
    npm run dev
    ```

The site will be available at `http://localhost:4321`.

## 🛠 Project Structure

- `src/content/docs/`: Contains the documentation content in English (root) and Spanish (`es/`).
- `src/assets/`: Static assets like images and icons.
- `src/styles/`: Global CSS and theme customizations.
- `astro.config.mjs`: Starlight and Astro configuration (sidebar, i18n, social links).

## 🤝 Contributing

Contributions are welcome! If you want to improve the documentation or fix a bug:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

### 🌍 Adding New Languages

To add a new language to the documentation:

1.  **Register the locale**: Add the language code and label to the `locales` object in `astro.config.mjs`.
2.  **Create the directory**: Create a folder in `src/content/docs/` with your language code (e.g., `pt/`).
3.  **Translate**: Copy existing `.mdx` files into the new folder and start translating!
4.  **Sidebar**: Add translations for sidebar labels in `astro.config.mjs`.

For more details, check our [Localization Guide](https://gopotency.vercel.app/guides/localization/).

Please make sure to check both English and Spanish versions if you are adding new content.
