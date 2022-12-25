// IMPORT
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
// const bodyparser = require('body-parser');   //not required
const port = 900;
const app = express();

// EXPRESS - STATIC FILE SERVING
app.use('/static',express.static('static'));
app.use(express.urlencoded({extended:false}));

// MONGOOSE
// connecting mongoose
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
}
// creating schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
});
// creating final model
const Contact = mongoose.model('danceWebsiteContact', contactSchema);


//PUG  - TEMPLATE ENGINE
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


// ENDPOINTS
app.get('/',async (req,res)=>{
    const params = {'title' : 'Poorvank-Dance-Academy'}
    res.status(200).render('home.pug',params);
});

app.get('/contact',async (req,res)=>{
    const params = {'title' : 'Poorvank-Dance-Academy'}
    res.status(200).render('contact.pug',params);
});

app.post('/contact',async (req,res)=>{
    // creating new object
    let myData = new Contact(req.body)
    myData.save()
    .then(()=>{res.status(200).render('home.pug');})
    .catch(()=>{res.status(404).send('Server Down! Try again later');})
});

// app.post('/contact',(req,res)=>{
//     console.log(req.body);
//     let name = req.body.name
//     let phone = req.body.phone
//     let email = req.body.email
//     let address = req.body.address
//     let desc = req.body.desc

//     let outputToWrite = `Form Response:- Name: ${name}, Phone No.: ${phone}, Email Id: ${email}, Address: ${address}, Concern: ${desc}\n`
//     fs.appendFileSync('form_response.txt',outputToWrite);
//     res.status(200).render('home.pug');
// });

// SERVER START
// app.listen(port,()=>{
//     console.log(`Server started at port no: ${port}`)
// })

app.listen(process.env.PORT || port);
