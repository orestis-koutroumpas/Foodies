// app.mjs

import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/foodies-routes.mjs';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import foodiesSession from './app-setup/app-setup-session.mjs';

// Load environment variables only if not in production
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
console.log("dsfggrd")
// Use JSON middleware
app.use(express.json());

//Session activation
app.use(foodiesSession)

app.get('*', (req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// Set up Handlebars view engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/', routes);

export { app as foodies };