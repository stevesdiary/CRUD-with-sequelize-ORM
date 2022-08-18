require("dotenv").config();

const { appendFile } = require('fs');
const express = require('express');
const { Customer } = require('./models/customer');
const sequelize = require('./utility/database');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 // this syncs the models with the database tables, which is not encouraged in production as it can lead to data loss.
sequelize.sync().then((result)=>{
   // return Customer.create({fname: "Tim", lname: "Williams", principal: "4000", interest: "0.02", repayment: "", paid: "50", balance: "", status: "owing"})
      // console.log(result);
   }).then(customer => {
      // console.log("First customer created:", customer);
   })
   .catch((err)=>{
      console.log(err);
   });

   app.post("/post", (req, res) => {
      const {principal, toPay: paid, fname, lname } = req.body;
      const interest = ((2/100) * parseFloat(principal))
      const repayment = parseFloat(principal) + parseFloat(interest)
      
      let status;
      if (paid < repayment){
         status = "partial"
      }else{
         status = "paid"
      }
      // console.log(interest, principal, status, "The result of fname")
      Customer.create({
      fname,
      lname,
      principal,
      interest: 2/100 * parseFloat(principal),
      repayment: repayment,
      paid,
      balance: repayment - paid,
      status
      }).then( (result) => {
         
         console.log(result)
         res.send(result)
         // console.log(result)
      } )
   });
   app.get('/xyz', async (req, res) => {
      const id = req.body.id
      const customers = await Customer.findOne({where: {id: id}})
      
      try {
         return res.json(customers)
      } catch (err) {
         console.log(err)
         return res.status(500).json(err)
      }
   })

   app.patch('/update/:id', async (req, res) => {
      const { toPay } = req.body
      const {id}= req.params;
      const customer = await Customer.findOne({where: {id: id}})

      if(!customer) throw Error("user not found")
      
      let repayment = parseFloat(customer.repayment)
      let paid = parseFloat(customer.paid) + parseFloat(toPay)
      let newBalance = parseFloat(customer.balance) - parseFloat(toPay)

      let status;
      if (paid < repayment){
         status = "partial"
      }else{
         status = "paid"
      }
      Customer.update({
         repayment,
         paid,
         balance: newBalance,
         status
         },{
            where: {
               id
            }
         }).then( (result) => {
            if (result === [1]){
               res.send (customer)
            }
            console.log(result, "Data has been updated successfully:", repayment, paid, status)
            res.send(result)
            
      } )
   })

   app.delete('/delete', async (req, res)=> {
      const id = req.body.id

   })

app.listen(3000, function(){
   console.log("App listening on port 3000")
});


