/**
 * All kinds of authentication related 
 * 
 * @author Yuxuan(Hardison) Wang
 * 
 * generated from auth0 official dashboard: https://manage.auth0.com/
 */

const WrongUsernameOrPasswordError = (email) => {
  return "Wrong Username Or Password";
}
export function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('CyberLibrary');
    const users = db.collection('Users');

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
      });
    });
  });
}
export function create(user, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('CyberLibrary');
    const users = db.collection('Users');

    users.findOne({ email: user.email }, function (err, withSameMail) {
      if (err || withSameMail) {
        client.close();
        return callback(err || new Error('the user already exists'));
      }

      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }

        user.password = hash;
        user.email_verified = false;
        users.insert(user, function (err, inserted) {
          client.close();

          if (err) return callback(err);
          callback(null);
        });
      });
    });
  });
}


export function verify (email, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('CyberLibrary');
    const users = db.collection('Users');
    const query = { email: email, email_verified: false };

    users.update(query, { $set: { email_verified: true } }, function (err, result) {
      client.close();

      if (err) return callback(err);
      callback(null, result.result.n > 0);
    });
  });
}


export function changePassword(email, newPassword, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

   const db = client.db('CyberLibrary');
    const users = db.collection('Users');

    bcrypt.hash(newPassword, 10, function (err, hash) {
      if (err) {
        client.close();
        return callback(err);
      }

      users.update({ email: email }, { $set: { password: hash } }, function (err, result) {
        client.close();
        if (err) return callback(err);
        callback(null, result.result.n > 0);
      });
    });
  });
}


export function getByEmail(email, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('CyberLibrary');
    const users = db.collection('Users');

    users.findOne({ email: email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}


export function remove(id, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://4177:4177@4177library.gxpxb0d.mongodb.net/test');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('CyberLibrary');
    const users = db.collection('Users');

    users.remove({ email: id }, function (err) {
      client.close();

      if (err) return callback(err);
      callback(null);
    });
  });

}
