# Contributing to Oasis

Thank you for your interest in contributing to Oasis! This project aims to help families in poverty navigate government assistance programs.

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/oasis.git
   cd oasis
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials

5. **Run the development server:**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**

3. **Test your changes:**
   ```bash
   npm run build
   npm run dev
   ```

4. **Commit with clear messages:**
   ```bash
   git commit -m "Add: Description of your change"
   ```

5. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

## Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Write comments for complex logic
- Keep accessibility in mind (WCAG 2.1 AA)

## Areas for Contribution

### High Priority
- [ ] Real EBT balance scraping (Tennessee ebtEDGE portal)
- [ ] Additional food pantries for Jackson, TN
- [ ] Spanish language support
- [ ] Improved ZENO responses (more intents)

### Medium Priority
- [ ] Receipt scanner (OCR)
- [ ] Job search integration
- [ ] Community forum/groupchat
- [ ] Push notifications for shutdown alerts

### Low Priority
- [ ] Dark mode
- [ ] Offline support
- [ ] Export budget reports
- [ ] Social sharing features

## Testing

Before submitting a PR:
- [ ] App builds without errors
- [ ] All features work in web browser
- [ ] Login/Signup flow works
- [ ] ZENO chatbot responds correctly
- [ ] Navigation works on all pages
- [ ] Responsive design works on mobile

## Questions?

Open an issue or reach out to the maintainers!

## Code of Conduct

Be respectful, inclusive, and professional. This project serves vulnerable populations - treat users with dignity.
