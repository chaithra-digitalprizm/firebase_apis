# firebase_apis
Installation:

1. npm install -g firebase-tools
2. firebase init


To Run:

firebase emulators:start

In postman:

1) Perform add, sub, multiplication and division on 2 numbers AND store it in firbase database:

POST  http://127.0.0.1:5001/fir-try-1-5bcaa/us-central1/add

Request params:
{
    "firstNumber":10,
    "secondNumber":5,
    "operator": "*"
}

2) Fetch all data from firbase database:

GET http://127.0.0.1:5001/fir-try-1-5bcaa/us-central1/getAllEntries
