/** 
 * @Author: Yuchen Ye
 * Source URL: https://www.youtube.com/watch?v=OuCrHynro0w
 * The detail of using this source please go to the README file
 **/

//decleared the dependency which is needed for connecting MongoDB
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const app = express()
//Use the port number 8080
const PORT = process.env.PORT || 8080

//Connecting the MongoDB by using the URL
mongoose.connect('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//If it is connected, output the message
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!');
})

//Create the Schema
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    author: String,
    genre: String,
    wordCount: Number,
    status: {
        type: String,
        enum: ['available', 'unavailable']
    }
}, { versionKey: false })
const ReviewSchema = new Schema({
    bookId: String,
    name: String,
    review: String
}, { versionKey: false });

//Create the model
const Book = mongoose.model('Book', BookSchema)
const Review = mongoose.model('Review', ReviewSchema);


// const data = {
//     title: 'test',
//     author: 'yuchen',
//     genre: 'test',
//     wordCount: 12138,
//     status:'available'
// }

// const newBook = new Book(data)

// newBook.save()
//   .then(savedBook => {
//     console.log('Book saved successfully:', savedBook);
//   })
//   .catch(err => {
//     console.error(err);
//   });

//Use the dependency
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json());


//Here is the routes part, get method to display the data
app.get('/api/reviews', (req, res) => {
    Review.find({})
        .then(data => res.json(data))
        .catch(error => console.log(error))
});

app.get('/api/reviews/:id', (req, res) => {
    const { id } = req.params;

    Review.find({ bookId: id })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
            res.status(500).json({ error });
        });
});

//Post method to upload the data
app.post('/api/reviews/add', async (req, res) => {
    const { bookId, name, review } = req.body;
  
    const newReview = new Review({ bookId, name, review });
    
    try {
      await newReview.save();
      res.json({ message: 'Review added successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(400).json({ error });
    }
  });

  if(process.env.NODE_ENV==='production'){
    app.use(express.static('../build'))
  }


//listen the app
app.listen(PORT, console.log(`server is starting at ${PORT}`))