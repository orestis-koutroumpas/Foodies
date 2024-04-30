// app.mjs
import express from 'express';
import { engine } from 'express-handlebars';
import route_home from './routes/route_home.mjs';
import route_search from './routes/route_search.mjs';
import route_about from './routes/route_about.mjs';

const app = express();
const port = process.env.PORT || 8000;

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'))

app.use('/home', route_home);
app.use('/search', route_search);
app.use('/about', route_about);

app.listen(port, () => console.log(`Ready: (http://localhost:${port}/home)`));