const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const session = require('express-session')
const flash = require('connect-flash')
const alert = require('alert')
const port = process.env.PORT || 3000

//config.assets.compile = true
/*if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}*/

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

app.use(express.urlencoded({extended: true})) 


app.use('/public', express.static('public'));
app.use('/js', express.static('js'))

app.use(session({secret: process.env.SECRET || 'secret'}))

app.use(flash());

/*THIS IS WHERE YOUR MONGO URL WILL GO. I HAVE HID THIS BECAUSE IT IS PRIVATE INFORMATION */
//const db = mongoose.connection

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('strictQuery', false)

/*app.use((req, res, next) => {
    res.locals.messages = req.flash('error');
    next()
})*/

app.get('/', (req,res) => {
    //req.flash('error','Username or Password is incorrect!')
    res.render('login')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/main', (req, res) => {
    if(!req.session.user_id) {
        res.redirect('/');
    } else {
        res.render('main')
    }
})

app.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        alert('your username or password is incorrect! Please try again!')
        //popups.alert({content: 'kjgfhkj'})
        res.render('login')
        //')
        //{messages: res.send(req.flash('error'))}
        //req.send('error', 'sijdh;jk')
        //alert("your username or password is incorrect! Please try again!")
    }
    else {

    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
        req.session.user_id = user._id
        res.render('main', {email})
    } else {
        alert('your username or password is incorrect! Please try again!')
        res.render('login')
    }

}

})

app.post('/main', async(req,res) => {
    const {name, email, password} = req.body;

    const hash = await bcrypt.hash(password, 10);
    const user = new User({name: name, email: email, password: hash})
    await user.save();
    req.session.user_id = user._id
    res.render('main', {email})
})

app.post('/logout', (req,res) => {
    req.session.user_id = null;
    req.session.destroy();
    res.redirect('/')
})

app.get('*', (req,res) => {
    res.render('login')
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`)
})