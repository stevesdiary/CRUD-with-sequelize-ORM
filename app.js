require("dotenv").config();
const { appendFile } = require('fs');
const express = require('express');
const { Customer } = require('./models/customer');
const sequelize = require('./utility/database');
const app = express();

 // this syncs the models with the database tables, which is not encouraged in production as it can lead to data loss.
sequelize.sync().then((result)=>{
      console.log(result);
   })
   .catch((err)=>{
      console.log(err);
   });

   app.get('/xyz', async (req, res) => {

      const customers = await Customer.findAll()
      
      try {
         return res.json(customers)
      } catch (err) {
         console.log(err)
         return res.status(500).json(err)
      }
   })

app.listen(3000, 'localhost', function(){

   console.log("App listening on port 3000")
})


