<h1 align="center">Welcome to PixelGenie 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
</p>

# PixelGinie

**PixelGinie** is a wallpaper app built with React Native (expo) that allows users to explore, download, and share high-quality wallpapers. Users can also filter wallpapers based on various criteria, save their favorites, and manage their accounts.

## Features

### Home Screen
- **Infinite Loading:** Continuously load more wallpapers as users scroll.
- **Category Horizontal Scroll:** Browse wallpapers by category.
- **Search Bar:** Search for wallpapers using keywords.
- **Filter Modal:** Apply filters like orientation, color, image type, and order.

### Wallpaper Interaction
- **Wallpaper Card:** Click to view a modal with image preview, download button, and share button.
- **Save to Favorites:** Logged-in users can save wallpapers by clicking the heart icon.

### Settings Screen
- **Favorites:** View your saved wallpapers.
- **Delete Account:** Remove your account (available only when logged in).
- **Logout:** Sign out of the app (available only when logged in).

### Authentication
- **Login:** Access the login screen to sign in.
- **Register:** Access the register screen to create a new account.
- **Favorites Access:** The favorites screen is accessible only when logged in. If not logged in

## Folder Structure

```sh
pixelGinie/
├── .expo/
├── .husky/
├── app/
├── assets/
├── components/
├── constants/
├── context/
├── hooks/
├── node_modules/
├── services/
├── util/
├── .env
├── .gitignore
├── .prettierrc.yml
├── app.json
├── babel.config.cjs
├── eslint.config.js
├── expo-env.d.ts
├── firebase.d.ts
├── package-lock.json
├── package.json
├── tsconfig.json
```

- **app/**: Contains the tabs and stack screen code.
- **assets/**: Stores image and other asset files.
- **components/**: Contains reusable UI components.
- **constants/**: Defines constant values used throughout the app.
- **context/**: Contains context providers for state management.
- **hooks/**: Custom hooks for managing state and side effects.
- **services/**: Contains API service files.
- **util/**: Utility functions and helpers.

## API Integration

- **Pixabay API**: This app utilizes the Pixabay API to fetch high-quality wallpapers. To use the Pixabay API, you need to set up an API key in the `.env` file.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/wallpaper-app.git
   ```
2. Navigate to the project directory:
    ```sh
    cd pixelGinie
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up your environment variables in the .env file:

    ```sh
    EXPO_PUBLIC_PIXA_AUTH_KEY=""
    EXPO_PUBLIC_PIXA_API_BASE_URL=""
    EXPO_PUBLIC_FIREBASE_API_KEY=""
    ```
5. Start the development server:
    ```sh
    npm start
    ```

### License
This project is licensed under the MIT.