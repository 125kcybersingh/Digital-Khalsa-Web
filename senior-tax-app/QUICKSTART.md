# Quick Start Guide

## For New Users (Seniors)

1. Open the application in your web browser
2. Read the welcome screen carefully
3. Click "Let's Get Started" when ready
4. Answer each question one at a time
5. Use the "Previous" button if you need to go back
6. Click "Save Progress" at any time to download your work
7. Review your summary at the end
8. Download or print your summary

## For Developers

### First Time Setup

```bash
# Navigate to the project
cd senior-tax-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at http://localhost:3000

### Making Changes

- **Edit questions**: Modify `src/questions.ts`
- **Change colors**: Edit `src/styles.css`
- **Update validation**: Modify `src/validation.ts`
- **Adjust layout**: Edit component files in `src/components/`

### Common Tasks

#### Add a new question:
1. Update `TaxFormData` type in `src/types.ts`
2. Add to `INITIAL_FORM_DATA` in `src/types.ts`
3. Create question object in `src/questions.ts`
4. Update `SummaryScreen.tsx` to display the answer

#### Change font sizes:
Edit the base size in `src/styles.css`:
```css
html {
  font-size: 20px; /* Increase for larger text */
}
```

#### Adjust button size:
In `src/styles.css`:
```css
.button {
  min-height: 80px; /* Make buttons taller */
  font-size: 1.5rem; /* Make text bigger */
}
```

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder - upload to any static hosting service.

### Testing

1. Test with keyboard only (no mouse)
2. Test with screen reader (VoiceOver, NVDA, JAWS)
3. Test on mobile devices
4. Test with seniors if possible!

## Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect GitHub repo
- **GitHub Pages**: Push `dist` to gh-pages branch
- **Cloudflare Pages**: Connect repo

### Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder to web server
3. Configure server to serve `index.html` for all routes

## Troubleshooting

### Port already in use
```bash
# Stop other processes or change port in vite.config.ts
npm run dev -- --port 3001
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### TypeScript errors
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

## Important Notes

- **This is front-end only**: No backend, no database
- **Data stays local**: Everything stored in browser localStorage
- **Not a tax filing**: This collects information only
- **No real SSN storage**: Data never leaves the browser

## Getting Help

- Check the main README.md for full documentation
- Review code comments in each file
- Test thoroughly before deploying to seniors

## Next Steps After Deployment

1. Get feedback from actual senior users
2. Adjust font sizes based on feedback
3. Monitor for errors (consider adding error tracking)
4. Plan voice input integration
5. Consider adding more language support
