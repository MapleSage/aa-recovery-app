# AA Recovery Companion App

A comprehensive digital companion for individuals working the 12 Steps of Alcoholics Anonymous. This app provides tools for step work, sobriety tracking, daily reflections, inventory management, and AI-powered support.

## Features

### Core Features
- **12 Step Journey**: Guided step-by-step work through all 12 steps
- **Sobriety Tracker**: Count days clean with visual milestone tracking
- **Step Work Tools**:
  - Step 4: Resentment, Fear, Harms Done, and Sex Conduct inventories
  - Step 8: Amends list builder
  - Step 9: Track amends progress
  - Step 10: Daily inventory entries
  - Step 11: Prayer and meditation journal
  - Step 12: Service work tracker
- **Awakening Journal**: Daily gratitude, fears, and resentments tracking
- **AI Chat Companion**: Compassionate AI support based on AA principles
- **Literature**: Access to recovery literature and resources
- **Sponsorship**: Connect with and track sponsor relationships
- **Settings**: Personalized app configuration

### Technical Features
- Offline-first with local storage
- Cloud sync with Azure Cosmos DB
- Cross-platform (Web, iOS, Android)
- Responsive design for all devices
- Privacy-focused data handling

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Custom CSS with modern design system
- **Backend**: Next.js API Routes
- **Database**: Azure Cosmos DB (NoSQL)
- **AI**: Azure OpenAI (GPT-4)
- **Mobile**: Capacitor (iOS & Android)
- **Storage**: LocalStorage + Cosmos DB sync

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Azure account (for cloud features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aa-recovery-app.git
cd aa-recovery-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.template .env.local
```

Edit `.env.local` with your Azure credentials (see [Deployment Guide](DEPLOYMENT.md))

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
aa-recovery-app/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── chat/            # AI chat endpoint
│   ├── chat/                # Chat interface
│   ├── literature/          # Recovery literature
│   ├── settings/            # App settings
│   ├── sponsorship/         # Sponsorship features
│   ├── step/                # Individual step pages
│   ├── tools/               # Recovery tools
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # Reusable React components
│   ├── BottomNav.tsx       # Bottom navigation
│   ├── StepCompletionToggle.tsx
│   ├── StepCard.tsx
│   └── ...
├── lib/                     # Utility libraries
│   ├── cosmos.ts           # Cosmos DB client
│   ├── db-service.ts       # Database operations
│   └── localStorage.ts     # Local storage utilities
├── public/                  # Static assets
├── capacitor.config.ts     # Mobile app config
├── next.config.ts          # Next.js config
├── package.json            # Dependencies
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

## Usage

### For Developers

#### Running locally:
```bash
npm run dev
```

#### Building for production:
```bash
npm run build
npm start
```

#### Running tests:
```bash
npm test
```

#### Building mobile apps:
```bash
# iOS
npx cap sync ios
npx cap open ios

# Android
npx cap sync android
npx cap open android
```

### For Users

1. **Set Sobriety Date**: Track your progress from day one
2. **Work the Steps**: Follow the guided step work process
3. **Daily Practice**:
   - Step 10: Evening inventory
   - Step 11: Morning meditation
   - Awakening Journal: Gratitude and reflections
4. **Get Support**: Use the AI chat for 24/7 companionship
5. **Track Progress**: See your journey unfold with step completion

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions including:
- Azure setup (Cosmos DB, OpenAI, App Service)
- Web deployment options
- Mobile app builds (iOS & Android)
- Environment configuration
- Monitoring and maintenance

## Privacy & Security

- **Local First**: All data stored locally by default
- **Optional Sync**: Cloud sync requires explicit setup
- **No Tracking**: No analytics or user tracking
- **Anonymous**: No personal information required
- **Secure**: All API communications encrypted
- **AA Traditions**: Respects anonymity principles

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Maintain responsive design patterns
- Test on multiple devices/browsers
- Keep accessibility in mind (WCAG 2.1)
- Document new features
- Respect AA principles and traditions

## Roadmap

- [ ] Multi-language support
- [ ] Sponsor matching feature
- [ ] Meeting finder integration
- [ ] Group sharing features
- [ ] Apple Health integration
- [ ] Calendar reminders
- [ ] Export data functionality
- [ ] Offline AI responses
- [ ] Custom step templates
- [ ] Recovery podcasts integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Alcoholics Anonymous World Services for the 12 Steps
- The recovery community for inspiration
- Contributors and supporters

## Disclaimer

This app is a tool to support recovery work and should not replace:
- Working with a sponsor
- Attending meetings
- Professional medical or mental health care
- The Big Book and AA literature

Always consult with your sponsor and healthcare providers for guidance on your recovery journey.

## Support

For technical support:
- Open an issue on GitHub
- Check the [Deployment Guide](DEPLOYMENT.md)
- Review Azure documentation

For recovery support:
- Contact your sponsor
- Attend AA meetings
- Call the AA helpline: 1-800-AA-HELPS

---

**Remember**: One day at a time. Keep coming back. It works if you work it.
# aa-recovery-app
