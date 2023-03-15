const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

// fetch all entries frm db
app.get('/', async(req, res) => {
    try{
        const getAllNum = await admin.firestore().collection('calculator').get()
        let num = [];
        getAllNum.forEach(doc => {
            let id = doc.id;
            let data = doc.data();
            num.push({id, ...data});
            
        });
        // res.status(201).send(JSON.stringify(num));
        res.status(200).send(num);
    } catch(err) {
        console.log('Has err while fetching data');
        res.status(400).json(err.message)
    }
}); 

// api to get 2 numbers and store it in firestoore
app.post('/', async(req, res) => {
    const numbers = req.body; //entire rrquest params
    const number1 = req.body.firstNumber; // first input from client
    const number2 = req.body.secondNumber; // second input from client
    console.log('add number:', req.body.firstNumber);
    try{
        await admin.firestore().collection('calculator').add(numbers); // store entire request params in firbase firestore db with tbl name calculator
        let result;

        // if(req.body.operator === "+"){
        //     result = req.body.firstNumber + req.body.secondNumber
        // }else if(req.body.operator === "*"){
        //     result = req.body.firstNumber * req.body.secondNumber
        // }

        // chk type of operator passed by the client
        switch(req.body.operator) {
            case '+':
                result = number1 + number2;
                console.log(`${number1} + ${number2} = ${result}`);
                break;
        
            case '-':
                result = number1 - number2;
                console.log(`${number1} - ${number2} = ${result}`);
                break;
        
            case '*':
                result = number1 * number2;
                console.log(`${number1} * ${number2} = ${result}`);
                break;
        
            case '/':
                result = number1 / number2;
                console.log(`${number1} / ${number2} = ${result}`);
                break;
        
            default:
                console.log('Invalid operator');
                // throw new functions.https.HttpsError('invalid-argument', 'Provide valid operator'); // if none of the switch case matches it throws an err with 500
                throw new Error('Provide one of this(+,-,*,/) valid operator');
                break;
        }
        res.status(201).send({status:'success', message: 'Numbers are stored successfully', operationResult: result});
    } catch(err) {
        console.log('Default is run');
        res.status(400).json(err.message)
    }
    
}); 

// export /add api
exports.add = functions.https.onRequest(app);

// export /getAll api Get metho
exports.getAllEntries = functions.https.onRequest(app);

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase helloword!");
});

exports.helloWorld1 = functions.https.onCall((data, context) => {
  // data holds the 'body' being sent
  // context holds metadata like headers, authentication, etc.
  return { message: 'I am a callable function' };
});
