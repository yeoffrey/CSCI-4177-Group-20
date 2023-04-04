const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')
const {boolean} = require("yup");

const app = express()
const PORT = process.env.PORT || 8080

mongoose.connect('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
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
        enum: ['available', 'unavailable']
    }
}, { versionKey: false })

const Book = mongoose.model('Book', BookSchema)

const ReviewSchema = new Schema({
    bookId: String,
    name: String,
    review: String
}, { versionKey: false });

const Review = mongoose.model('Review', ReviewSchema);

const bookHistorySchema = new Schema({
    title: String,
    pageCount: Number,
    description: String,
    averageRating: Number,
    thumbnail: String,
    bookID: String
}, { versionKey: false,
    _id: false})

const UserHistorySchema = new Schema({
    userID: String,
    bookHistory: [bookHistorySchema]
    }, { versionKey: false })
const userHistory = mongoose.model('userHistory', UserHistorySchema);
const bookHistory = mongoose.model('bookHistory', bookHistorySchema);
// const data = {
//      email: 'test@test.ca',
//       bookHistory: [{
//             title: "Flowers",
//             pageCount: "24",
//             description: "FLOWERS DESC",
//             averageRating: null,
//             thumbnail: "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72XJQIKbEALD3DBXtK3HapO7uy_y6eRodbY6nmDaImoDNgFYvyzGE-mt3VxK8NLhp1YN-par32T-crvbif4oNj6IjvY5oPZRVshURUb7sxBzUwc32JET-WKFoXGy1mO4XuTq5vO&source=gbs_api",
//             previewLink: "String"
//      },{
//           title: "GOOGLE BOOK",
//           pageCount: "260",
//           description: "googbook DESC",
//           averageRating: null,
//           thumbnail: "http://books.google.com/books/content?id=_ojXNuzgHRcC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72XJQIKbEALD3DBXtK3HapO7uy_y6eRodbY6nmDaImoDNgFYvyzGE-mt3VxK8NLhp1YN-par32T-crvbif4oNj6IjvY5oPZRVshURUb7sxBzUwc32JET-WKFoXGy1mO4XuTq5vO&source=gbs_api",
//           previewLink: "String"
//       }],
//      status:'available'
// }

//  const newBookHistory = new bookHistory(data)
//
// newBookHistory.save()
//    .then(savedBook => {
//      console.log('Book saved successfully:', savedBook);
//    })
//    .catch(err => {
//     console.error(err);
//    });

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
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json());

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

app.get('/api/bookHistory', (req, res) => {
    userHistory.find({})
        .then(data => res.json(data))
        .catch(error => console.log(error))
});
app.get('/api/bookHistory/:id', (req, res) => {
    const { id } = req.params;

    userHistory.find({ userID: id })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
            res.status(500).json({ error });
        });
});

app.post('/api/bookHistory/add', async (req, res) => {
    const { averageRating, bookID, description, pageCount, thumbnail, title, userID } = req.body;
    const newBookHistory = new bookHistory({ title, pageCount, description, averageRating, thumbnail, bookID });
    const newUserHistory = new userHistory({ userID, bookHistory: [newBookHistory] })
    if (await userHistory.exists({userID: userID})) {
        console.log("User Has History, Adding to List (if not already in list)")
        await userHistory.findOneAndUpdate(
            {userID: userID},
            {$addToSet: {bookHistory: newBookHistory}
        })
    } else {
        console.log("New User, Creating new DB entry")
        try {
            await newUserHistory.save();
            res.json({message: 'Book added to history successfully!'});
        } catch (error) {
            console.log('Error:', error);
            res.status(400).json({error});
        }
    }
});


app.listen(PORT, console.log(`server is starting at ${PORT}`))