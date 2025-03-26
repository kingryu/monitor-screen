# Large Screen Monitoring Project

## Project Introduction
A large screen monitoring project developed with Vue3, TypeScript, and Vite. It utilizes the Element Plus component library and integrates the Echarts charting library to achieve responsive layout and adaptive scaling functionality. The project uses Pinia for state management, Vue Router for routing control, SCSS for style management, and postcss-pxtorem for automatic conversion of px to rem units.

## Technology Stack
- Vue3 + TypeScript + Vite
- Element Plus
- Echarts
- Vue Router
- Pinia
- SCSS
- postcss-pxtorem

## Project Structure
```plaintext
├── public/               # Static resources
├── src/                  # Source code
│   ├── assets/          # Project asset files
│   ├── components/      # Common components
│   ├── router/          # Router configuration
│   ├── store/           # Pinia state management
│   ├── styles/          # Global styles
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Entry file
├── vite.config.ts       # Vite configuration
└── package.json         # Project dependencies
```

## Main Features
- Responsive Layout: Designed based on 1920x1080 resolution with support for proportional scaling
- Data Visualization: Integration of Echarts to implement various charts including bar charts, pie charts, line charts, etc.
- State Management: Using Pinia to manage chart data and application state
- Component-based Development: Rapid interface building based on Element Plus component library
- Style Management: Using SCSS preprocessor for modular style management