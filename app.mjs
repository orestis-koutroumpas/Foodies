// app.mjs

import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/foodies-routes.mjs';
import dotenv from 'dotenv';

// Load environment variables only if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

// Set up Handlebars view engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', routes);

export { app as foodies };