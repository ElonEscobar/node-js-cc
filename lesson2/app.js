const express = require('express');
const morgan = require('morgan');

// express app
const app = express();

// listen for requests
app.listen(3000);
// set- is used to make configurations
app.set('view engine', 'ejs');


// since code is run downwards, using next ensure that execution continues to the 'next one 
// ? example middleware
// app.use((req, res, next) => {
//     console.log('New request made');
//     console.log('path:', req.path);
//     console.log('host:', req.hostname);
//     next();
// })

// app.use((req, res, next) => {
//     console.log('Next request');
//     next();
// })

// morgan middleware is used to display info about requests
app.use(morgan('dev'))

// static files

app.use(express.static('public'))

app.get('/', (req, res)=> {
    // res.send(`<p>Express App</p>`)
    // res.sendFile('./views/index.html', { root: __dirname })

    //? sendfile takes in a relative path and checks its from the root of the machine
    // hence we also include a object with root attr set to the relative path of the project

    const blogs = [
        {title: 'Avatar', snippet: 'The last air bender'},
        {title: 'Avengers', snippet: 'Marvel MCU'},
        {title: 'The Incredibles', snippet: 'Supes'},
        {title: 'Thundermans', snippet: 'Hiden supes'}

    ]

    res.render('index', { title: 'Home' , blogs})
    
})

app.get('/about', (req, res)=> {
    // res.send(`<p>About </p>`)
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create' });
})
// // redirects

// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// 404


app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: 'Not found' })
})
