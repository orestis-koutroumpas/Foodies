// app.mjs
import express from 'express';
import { engine } from 'express-handlebars';
import route_home from './routes/route-home.mjs';
import route_search from './routes/route-search.mjs';
import route_about from './routes/route-about.mjs';
import route_user_profile from './routes/route-user-profile.mjs';
import route_store from './routes/route-store.mjs';

const app = express();
const port = process.env.PORT || 8000;

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'))

app.use('/home', route_home);
app.use('/search', route_search);
app.use('/about', route_about);
app.use('/user_profile', route_user_profile);
app.use('/store', route_store);

app.listen(port, () => console.log(`Ready: (http://localhost:${port}/home)`));