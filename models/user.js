const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'You must enter a name'],
    minlength: [1, 'Name must between 1 and 99 characters'],
    maxlength: [99,'Name must between 1 and 99 characters']
  },
  password: {
    type: String,
    require: [true, 'You must enter a password'],
    minlength: [8, 'Password must between 8 and 128 characters'],
    maxlength: [128,'Password must between 8 and 128 characters']
  },
  email: {
    type: String,
    require: [true, 'You must enter an email'],
    minlength: [5, 'Email must between 5 and 99 characters'],
    maxlength: [99, 'Email must between 5 and 99 characters']
  }
});

userSchema.set('toObject', {
  //* doc to transform, ret: transformed doc
  transform: function(doc, ret, options) {
    let returnJson = {
      _id: ret._id,
      email: ret.email,
      name: ret.name
    }
    return returnJson;
  }
});

//*pre hook - hash password before create new user
userSchema.pre('save', function(next) {
  if (this.isNew) {
    let hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
  }
  next();
});

//* check password for signed user (customized function)
userSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);