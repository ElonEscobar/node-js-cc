const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { result } = require('lodash');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://don:netninja123@nodetuts.uc9njt4.mongodb.net/?retryWrites=true&w=majority'
// deprecation warn, { newUserUrlParser: true, useUnifiedTopology: true }
mongoose.connect(dbURI)
    .then((res) => app.listen(3000))
    .catch((err) => console.error(err));


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

// middleware to get data from the input fields
app.use(express.urlencoded({ extended: true }))


// mongo and mongoose sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New blog',
//         snippet: 'about new blog',
//         body: 'more about this blog'
//     })
//     blog.save()
//         .then((result) => res.send(result))
//         .catch((err)=> console.log(err));
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('6492b5e0019187254a15b2b6')
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// })



app.get('/', (req, res)=> {
    // res.send(`<p>Express App</p>`)
    // res.sendFile('./views/index.html', { root: __dirname })

    //? sendfile takes in a relative path and checks its from the root of the machine
    // hence we also include a object with root attr set to the relative path of the project

    res.redirect('/blogs')
})

app.get('/about', (req, res)=> {
    // res.send(`<p>About </p>`)
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: 'About' });

})

app.get('/blogs', (req, res) => {
    // -1 sorts from the newest
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All blogs', blogs: result });
        })
        .then((err) => console.log(err));
})

app.post('/blogs', (req, res)=> {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .then((err) => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog details'})
        })
        .catch((err) => console.log(err))
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs'})
        })
        .catch((err) => console.log(err))
})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create new blog' });
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
