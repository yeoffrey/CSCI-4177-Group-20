const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080

mongoose.connect('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected!');
})

const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    wordCount: Number,
    status: {
        type: String,
        enum: ['available','unavailable']
    }
},{ versionKey: false })

const Book = mongoose.model('Book',BookSchema) 

const data = {
    title: 'test',
    author: 'yuchen',
    genre: 'test',
    wordCount: 12138,
    status:'available'
}

const newBook = new Book(data)

// newBook.save()
//   .then(savedBook => {
//     console.log('Book saved successfully:', savedBook);
//   })
//   .catch(err => {
//     console.error(err);
//   });

app.use(morgan('tiny'))

app.get('/api',(req,res)=>{

    Book.find({ })
        .then((data)=>{
            console.log('Data: ',data)
            res.json(data)
        })
        .catch((error)=>{
            console.log('error', error)
        })
    
})

app.get('/api/name',(req,res)=>{
    const data = {
        username: 'peterson',
        age: 5
    }
    res.json(data)
})

app.listen(PORT,console.log(`server is starting at ${PORT}`))