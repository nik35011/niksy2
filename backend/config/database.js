const mongoose = require('mongoose');

// Connect to MongoDB
const connectdatabase=()=>{
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then((data) => {
          console.log(`mongodb is connected  on server :${data.connection.host} `);
          // You can start working with your database here
        })
       
}
module.exports=connectdatabase
