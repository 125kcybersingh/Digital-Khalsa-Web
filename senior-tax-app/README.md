# Senior-Friendly Tax Preparation Application

A React web application designed specifically for users 70+ years old, featuring extra-large fonts, high contrast colors, and a simple step-by-step interface for collecting tax information.

## Features

### Accessibility-First Design
- **Extra large fonts**: 18px minimum body text, 32px+ headings
- **High contrast colors**: Dark text on light backgrounds for maximum readability
- **Large buttons**: Minimum 60px height with clear labels
- **One question per screen**: No overwhelming forms
- **Progress tracking**: Clear visual progress bar
- **Plain English**: No confusing tax jargon
- **Generous spacing**: Easy to tap/click targets

### User Experience
- **Welcome screen**: Clear explanation of what to expect
- **Step-by-step flow**: 17 questions, one at a time
- **Navigation**: Easy Previous/Next buttons
- **Progress saving**: Automatic localStorage + manual JSON download
- **Load progress**: Upload previously saved JSON files
- **Summary view**: Complete overview of all answers
- **PDF download**: Text file download of summary
- **Print-friendly**: Optimized print styles

### Voice Integration (Coming Soon)
- Microphone icons placed next to all text inputs
- Banner notification about future voice assistance
- All placeholders are disabled with helpful tooltips

## Questions Collected

1. Your full legal name
2. Spouse's full legal name (optional)
3. Your Social Security Number
4. Spouse's Social Security Number (optional)
5. Current home address
6. Your date of birth
7. Spouse's date of birth (optional)
8. Primary state of residence (NJ or FL)
9. Did you work in 2024?
10. Total income from all sources (estimate)
11. Do you own your home?
12. Do you have retirement accounts?
13. Do you have investment accounts?
14. Do you have rental properties?
15. Charitable donations over $250?
16. Medical expenses over $5,000?
17. Do you have dependents?

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS3** with custom accessible styles
- **LocalStorage** for automatic progress saving
- **File download APIs** for JSON/TXT export

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd senior-tax-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to http://localhost:3000

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
senior-tax-app/
├── src/
│   ├── components/
│   │   ├── WelcomeScreen.tsx          # Initial welcome screen
│   │   ├── QuestionScreen.tsx         # Individual question display
│   │   ├── SummaryScreen.tsx          # Final summary with download
│   │   ├── ProgressBar.tsx            # Progress indicator
│   │   ├── NavigationButtons.tsx      # Previous/Next buttons
│   │   └── VoiceInputPlaceholder.tsx  # Voice input placeholder
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # React entry point
│   ├── types.ts                       # TypeScript interfaces
│   ├── questions.ts                   # Question configuration
│   ├── validation.ts                  # Form validation logic
│   └── styles.css                     # All styling (accessible)
├── index.html                         # HTML entry point
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── vite.config.ts                     # Vite configuration
└── README.md                          # This file
```

## Key Design Decisions

### One Question Per Screen
Research shows that seniors prefer focused, single-task interfaces. Each question gets its own screen with no distractions.

### High Contrast & Large Text
All text meets WCAG AAA contrast ratios. Minimum font sizes are larger than typical web applications.

### Local State Only
No backend required - all data stays in the browser. Users can download their progress as JSON files.

### Forgiving Validation
Validation provides clear, friendly error messages. Estimates are acceptable for income fields.

### Auto-Save
Progress automatically saves to localStorage after each question, preventing data loss.

## Customization

### Adding New Questions

1. Add the field to `TaxFormData` in `src/types.ts`
2. Add initial value to `INITIAL_FORM_DATA` in `src/types.ts`
3. Add question configuration to `src/questions.ts`
4. Update summary display in `src/components/SummaryScreen.tsx`

### Changing Colors

Edit the CSS variables and color values in `src/styles.css`. Current colors:
- Primary blue: `#2563eb`
- Success green: `#059669`
- Error red: `#c53030`
- Background: `#f5f5f5`
- Text: `#1a1a1a`

### Adjusting Font Sizes

Change the base font size in `src/styles.css`:
```css
html {
  font-size: 18px; /* Increase/decrease as needed */
}
```

All other sizes use `rem` units and will scale proportionally.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Semantic HTML elements
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast mode support
- Reduced motion support
- Focus visible indicators (4px outline)
- Print-friendly styles

## Future Enhancements

- [ ] Voice input integration (Web Speech API)
- [ ] Multi-language support
- [ ] PDF generation with proper formatting
- [ ] Cloud save option (optional)
- [ ] Additional state support beyond NJ/FL
- [ ] Dependent details collection
- [ ] Document upload capability
- [ ] Integration with tax preparation software

## License

MIT

## Support

This is a demonstration application. For actual tax preparation, please consult with a qualified tax professional.

## Acknowledgments

Designed with input from senior user experience research and accessibility guidelines including:
- WCAG 2.1 Level AAA
- NIH Senior-Friendly Web Design Guidelines
- AARP Technology Design Best Practices
