# TicketApp - React Ticket Management System

A modern, responsive ticket management system built with React and TailwindCSS.

## Features

- 🔐 Secure authentication system with protected routes
- 📱 Fully responsive design for all devices
- 🎨 Modern UI with wavy backgrounds and decorative elements
- ✨ Real-time form validation and user feedback
- 🎯 Complete ticket CRUD operations
- 📊 Dashboard with ticket statistics

## Technologies Used

- React
- React Router DOM
- TailwindCSS
- Formik & Yup (Form handling and validation)
- HeadlessUI (Accessible components)
- React Hot Toast (Notifications)
- Heroicons (Icons)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── ProtectedRoute.js
│   └── WaveBackground.js
├── context/          # React contexts
│   ├── AuthContext.js
│   └── TicketContext.js
├── pages/            # Main page components
│   ├── Dashboard.js
│   ├── Landing.js
│   ├── Login.js
│   ├── Signup.js
│   └── Tickets.js
└── utils/           # Utility functions
```

## Authentication

The app uses a simulated authentication system with localStorage:
- Key: `ticketapp_session`
- Token format: Base64 encoded email (for demo purposes)

### Test Credentials
- Email: test@example.com
- Password: password123

## Accessibility Features

- Semantic HTML structure
- ARIA labels where necessary
- Keyboard navigation support
- Focus management in modals
- Color contrast compliance
- Screen reader friendly status messages

## Known Issues

1. Authentication is simulated and should not be used in production
2. State is not persistent and resets on page reload

## Future Improvements

1. Add real backend integration
2. Implement user roles and permissions
3. Add ticket filtering and search
4. Implement real-time updates with WebSocket
5. Add ticket assignments and comments

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request