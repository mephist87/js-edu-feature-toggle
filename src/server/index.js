const express = require('express')
const exphbs  = require('express-handlebars');
const request = require('request');

const USE_MOCKS = process.env.USE_MOCKS === '1';
const PORT = process.env.PORT || 3000;

USE_MOCKS && require('./mock/mock');

let app = express();

// set Handlebars as default view engine
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layoutsDir: 'src/server/views/',
    defaultLayout: 'layout'
}));

app.set('view engine', '.hbs');
app.set('views', 'src/server/views/');

// Serve static
app.use('/assets', express.static('.build/assets'));

// Healthcheck
app.get('/health', function (req, res) {
   request.get('http://localhost:8080/health', (error, response, body) => {
       if (error) {
           res.send(error);
           return;
       }

       res.send(body);
   })
});

// Index page
app.get('/', function (req, res) {
   request.get('http://localhost:8080/', (error, response, body) => {
       if (error) {
           res.status(500).send('Error');
           return;
       }
       renderAsTable(body);
       res.render('home', {
           // title: body
           title: '<table class="table table-striped table-hover">\n' +
           '<thead>\n' +
           '<tr>\n' +
           '<th>name</th>\n' +
           '<th>genre</th>\n' +
           '<th>release date</th>\n' +
           '</tr>\n' +
           '</thead>\n' +
           '<tbody>\n' +
           '<tr class="active">\n' +
           '<td>The Shawshank Redemption</td>\n' +
           '<td>Crime, Drama</td>\n' +
           '<td>14 October 1994</td>\n' +
           '</tr>\n' +
           '</tbody>\n' +
           '</table>'
       });
   })
});

app.listen(PORT, () => {
    console.log('🎉  Hoooray! Express is listening on http://localhost:' + PORT);
});


function renderAsTable(json) {

}