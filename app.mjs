// app.mjs

import express from 'express';
import { engine } from 'express-handlebars';
import routes from './routes/foodies-routes.mjs'

import dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use('/', routes);

export { app as foodies}