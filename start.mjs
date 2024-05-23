// start.mjs

import { foodies } from './app.mjs';
import dotenv from 'dotenv';

// Load environment variables only if not in production
if (process.env.NODE_ENV !== 'production') {
   console.log('loading .env');
   dotenv.config();
}

const port = process.env.PORT || 3000;

const server = foodies.listen(port, () => {
   console.log(`Server running at http://127.0.0.1:${port}`);
});

// Graceful shutdown
const shutdown = () => {
   console.info('SIGTERM signal received.');
   console.log('Closing http server.');
   server.close(() => {
      console.log('Http server closed.');
      process.exit(0);
   });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown); // Handle Ctrl+C in terminal

process.on('uncaughtException', (err) => {
   console.error('Uncaught Exception:', err);
   shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
   shutdown();
});
