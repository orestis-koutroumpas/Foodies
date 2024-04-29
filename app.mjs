// app.mjs
import express from 'express';
import { engine } from 'express-handlebars';
import home from './routes/home.mjs';
import search from './routes/search.mjs';
import about from './routes/about.mjs';

const app = express();
const port = process.env.PORT || 8000;

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'))

app.use('/home', home);
app.use('/search', search);
app.use('/about', about);

app.listen(port, () => console.log(`Ready: (http://localhost:${port}/home)`));