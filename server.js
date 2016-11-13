const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var logMessage = `${now}: ${request.method} ${request.url}`;

    console.log(logMessage);
    fs.appendFileSync('server.log', logMessage + '\n');
    next();
})

// app.use((request, response) => {
//     response.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentDate', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/hello', (request, response) => {
    response.send(`
<h1>Hello Express!</h1>
<p> How are you?</p>
`)
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        company: 'IKS GmbH',
        welcomeMessage: 'Welcome to my home page!',
        currentYear: new Date().getFullYear(),
        street: 'Kerkpad',
        number: '17',
        zip: '47551',
        city: 'Bedburg-Hau'
    })
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
        company: 'IKS GmbH'
    });
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Something went wrong!'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
