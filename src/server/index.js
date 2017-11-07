let express = require('express')
let exphbs  = require('express-handlebars');
let request = require('request');
let mock = require('./mock/mock');

const USE_MOCKS = process.env.USE_MOCKS === '1';
const PORT = process.env.PORT || 3000;

if (USE_MOCKS) {
    mock.healthCheck()
}

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
       }

       res.send(body);
   })
});

// Index page
app.get('/', function (req, res) {
   request.get('http://localhost:8080/health', (error, response, body) => {
       if (error) {
           res.send(error);
       }

       res.render('home', {
           title: 'Feature toggle UI'
       });
   })
});

app.listen(PORT, () => {
    console.log('🎉  Hoooray! Express is listening on http://localhost:' + PORT);
});
