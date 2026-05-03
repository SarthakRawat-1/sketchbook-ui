# Contributing to Sketchbook UI

Thanks for your interest in contributing to Sketchbook UI! We're building a component library with a unique hand-drawn aesthetic, and we'd love your help making it better.

Please note that the library is currently in Beta.

## Code of Conduct

Be respectful, constructive, and kind. We're all here to build something cool together.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A code editor (VS Code recommended)

### Setup

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/SarthakRawat-1/sketchbook-ui.git
   cd sketchbook-ui
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run Storybook to see all components:
   ```bash
   npm run storybook
   ```

## Development Workflow

### Available Scripts

- `npm run dev` - Start Vite dev server with the demo app
- `npm run storybook` - Start Storybook on port 6006
- `npm run build` - Build the library for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build

### Project Structure

```
sketchbook-ui/
├── src/
│   ├── components/        # All UI components
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   └── ...
│   ├── lib/              # Shared utilities and primitives
│   │   ├── sketch-primitives.tsx
│   │   ├── sketch-styles.ts
│   │   └── utils.ts
│   ├── styles/           # Global styles
│   └── index.ts          # Main library export
├── .storybook/           # Storybook configuration
└── public/               # Static assets
```

## How to Contribute

### Reporting Bugs

Found a bug? Please open an issue with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, Node version)

### Suggesting Features

Have an idea? Open an issue with:

- A clear description of the feature
- Why it would be useful
- Any implementation ideas you have
- Examples from other libraries (if relevant)

### Submitting Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards (see below)

3. Test your changes:
   - Run the dev server and verify visually
   - Check Storybook to ensure stories work
   - Run `npm run lint` to check for issues

4. Commit your changes with a clear message:

   ```bash
   git commit -m "feat: add new tooltip positioning options"
   ```

5. Push to your fork:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Open a Pull Request on GitHub with:
   - A clear title and description
   - Reference to any related issues
   - Screenshots or GIFs for visual changes
   - Notes on testing you've done

## Coding Standards

### Component Guidelines

1. **TypeScript First**: All components must be written in TypeScript with proper type definitions

2. **Props Interface**: Export a clear props interface:

   ```typescript
   export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
     size?: "sm" | "md" | "lg";
     // ... other props
   }
   ```

3. **Customization**: Support `colors` and `typography` props for theming:

   ```typescript
   colors?: {
     bg?: string;
     bgOverlay?: string;
     stroke?: string;
     text?: string;
   };
   typography?: {
     fontSize?: string;
     fontWeight?: string | number;
     fontFamily?: string;
   };
   ```

4. **Accessibility**:
   - Use semantic HTML
   - Support keyboard navigation
   - Include proper ARIA attributes
   - Test with screen readers when possible

5. **Hand-Drawn Aesthetic**:
   - Use `SketchPaper` and `SketchBorder` primitives
   - Create wobbly, organic SVG paths
   - Add subtle hover and focus effects
   - Include small decorative elements (stars, scribbles)

6. **Responsive**: Components should work on mobile and desktop

### Storybook Stories

Every component needs Storybook stories covering:

- Default state
- All size variants
- All color variants
- Disabled state
- Interactive states (hover, focus)
- Edge cases (long text, empty state, etc.)

### Code Style

- Use functional components with hooks
- Use `React.forwardRef` for components that need ref support
- Prefer `const` over `let`
- Use meaningful variable names
- Add comments for complex logic
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks

## Questions?

- Open an issue for questions about contributing
- Check existing issues and PRs for similar discussions
- Review the codebase to see how existing components work

## License

By contributing to Sketchbook UI, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Sketchbook UI! Every contribution, no matter how small, helps make this library better for everyone.
