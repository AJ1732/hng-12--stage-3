# AI Text Processing Interface

An AI-powered text processing application that enables users to input text and utilize Chrome's native AI APIs for language detection, translation, and summarization capabilities.

## Features

- 💬 Chat-like interface for text input and output
- 🔍 Automatic language detection for input text
- 🌐 Translation support for multiple languages:
  - English (en)
  - French (fr)
  - Spanish (es)
  - Portuguese (pt)
  - Russian (ru)
  - Turkish (tr)
- ✂️ Text summarization for English texts over 150 characters

## Live Demo

[View Live Demo](https://1732-hng-12-stage-3.netlify.app/)

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Framer motion
- Shadcn/ui Components
- Chrome AI APIs:
  - Language Detection API
  - Translator API
  - Summarizer API

## Getting Started

### Prerequisites

- Chrome browser with experimental AI APIs enabled
- Node.js 18+ installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/AJ1732/hng-12--stage-3.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env.local file and add your API trial tokens:

```bash
NEXT_PUBLIC_TRANSLATOR_API_TRIAL_TOKEN=your_token_here
NEXT_PUBLIC_LANGUAGE_API_TRIAL_TOKEN=your_token_here
NEXT_PUBLIC_SUMMARIZER_API_TRIAL_TOKEN=your_token_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open http://localhost:3000 in Chrome

## Usage

1. Enter text in the input field at the bottom
2. Click send or press Enter to display in chat area
3. Original text will show with detected language
4. For English texts over 150 characters, click "Summarize"
5. Select target language and click "Translate" to convert text

## Key Features

### Language Detection

- Automatic detection of input text language
- Language code displayed below each message

### Translation

- Support for 6 target languages
- Clean translation UI with language selector
- Error handling for failed translations

### Summarization

- Available for English texts over 150 characters
- AI-powered text summarization
- Original text preserved

### Accessibility

- Full keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader friendly

### Responsive Design

- Mobile-first approach
- Flexible layouts
- Optimized for all screen sizes


## Acknowledgements

- [Chrome AI APIs Documentation](https://developer.chrome.com/docs/ai/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com/)
