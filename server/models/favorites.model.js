const mongoose = require("mongoose");

//const {encrypt} = require('../utils')

// const hash = encrypt('hola')
// console.log('--hash-', hash)

const FavoritesSchema = mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  pokeName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
});


/* UserSchema.index( 
  {
    username: 'text', 
    email: 'text', 
    // '$**': 'text'
  },{
    weights: {
      username: 5,
      email: 1,
    },
  }
);  */


/* UserSchema.statics.login = async function( username, password){

  // return await this.find({"username" : username,"password" : password})
  console.log(`
  -username- ${username}
  -password- ${password}
  `);
  const user =  await this.find({"username" : username,"password" : password})
  console.log('-login-', user);
  return user
} */

const User = mongoose.model("Favorites", FavoritesSchema);


module.exports = User;
