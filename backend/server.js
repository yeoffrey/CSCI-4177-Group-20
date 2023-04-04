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
const { boolean } = require("yup");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
import { createHash } from "crypto";
const secretKey = "secretkey"; // better make it retrieved from db.



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

const bookHistorySchema = new Schema({
    title: String,
    pageCount: Number,
    description: String,
    averageRating: Number,
    thumbnail: String,
    previewLink: String
}, { versionKey: false })

const UserHistorySchema = new Schema({
    userID: String,
    bookHistory: [{
        type: bookHistorySchema,
        required: false
    }]
}, { versionKey: false })

const bookHistory = mongoose.model('bookHistory', UserHistorySchema);
// const data = {
//      email: 'test@test.ca',
//      password: 'RNADOMAASDWJDANSD',
//      email_verified: true,
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

app.get('/api/bookHistory', (req, res) => {
    bookHistory.find({})
        .then(data => res.json(data))
        .catch(error => console.log(error))
});
app.get('/api/bookHistory/:id', (req, res) => {
    const { id } = req.params;

    bookHistory.find({ userID: id })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
            res.status(500).json({ error });
        });
});

/**
 * authentication stuff
 * @author Yuxuan(Hardison) Wang
 */
const UserSchema = new Schema({
    _id: {
        type: Number,
        required: true,
        unique: true,
        autoIncrement: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    permission: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    bookHistory: [{ type: UserHistorySchema, ref: 'Book' }]
});

const User = mongoose.model('user', UserSchema);


// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        /**
         * Retrieve the salt from the db, and get the stored user.password.
         * Compare it with the hashedpassword computed below.
         */
        const salt = user.salt;
        const storedPassword = user.password;
        const hashedPassword = createHash("sha512")
          .update(password)
          .update(createHash("sha512").update(salt, "base64").digest("base64"))
          .digest("base64");
        
        if (hashedPassword !== storedPassword) {
          res.status(401).json({ error: 'Invalid email or password' });
          return;
        }
        
        const token = jwt.sign({ userId: user._id }, secretKey);
        res.json({ token });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ error });
    }
});

  
// Register
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(409).json({ error: 'User with that email already exists' });
        return;
      }
  
      const salt = crypto.randomBytes(512).toString('base64');
      const hashedPassword = createHash("sha512")
        .update(password)
        .update(createHash("sha512").update(salt, "base64").digest("base64"))
        .digest("base64");
      const newUser = new User({ email, password: hashedPassword, salt });
      await newUser.save();
      
      const token = jwt.sign({ userId: newUser._id }, secretKey);
      res.json({ token });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error });
    }
  });
  


// Get user data
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password -salt');
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error });
  }
});

// Delete user
app.delete('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error });
  }
});

// Update user password
// Update user password
app.put('/api/user/:id/updatePassword', async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      const hashedOldPassword = createHash("sha512")
        .update(oldPassword)
        .update(createHash("sha512").update(user.salt, "base64").digest("base64"))
        .digest("base64");
  
      if (hashedOldPassword !== user.password) {
        res.status(401).json({ error: 'Invalid password' });
        return;
      }
  
      const salt = crypto.randomBytes(512).toString('base64');
      const hashedPassword = createHash("sha512")
        .update(newPassword)
        .update(createHash("sha512").update(salt, "base64").digest("base64"))
        .digest("base64");
  
      user.password = hashedPassword;
      user.salt = salt;
      await user.save();
  
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error });
    }
  });
  

//listen the app
app.listen(PORT, console.log(`server is starting at ${PORT}`))