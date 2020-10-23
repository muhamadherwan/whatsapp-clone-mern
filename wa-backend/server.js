// import
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from "pusher";
import cors from 'cors';

// app config
const app = express()
const port = process.env.PORT || 9000

// use pusher for fecth messages realtime
const pusher = new Pusher({
  appId: '1095586',
  key: '32c5c0415607032f896b',
  secret: 'e1f5723f31b5b788431f',
  cluster: 'ap1',
  encrypted: true
});

// middleware
app.use(express.json());
app.use(cors());
 
// DB config
const connection_url = 'mongodb+srv://herwan:wasd1234@cluster0.ouriw.mongodb.net/whatsappdb?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Connect to mongoDB
const db = mongoose.connection;

db.once('open', ()=> {
  console.log("DB CONNECT");

  const msgCollection = db.collection('messagecontents');
  
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log('a change happen', change);

    if (change.operationType === 'insert') {
      const messageDetails  = change.fullDocument;
      pusher.trigger('messages', 'inserted',
        {
          name: messageDetails.name,
          message: messageDetails.message,
          timestamp: messageDetails.timestamp,
          received: messageDetails.received
        });
    } else {
      console.log('Error triggering pusher')
    }

  });


});



// api routes
app.get('/',(req,res)=> res.status(200).send('hello wan zuck'))

// get new message from db
app.get('/messages/sync', (req, res) => {
  
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
})

// post new message to db
app.post('/messages/new', (req, res) => {
  const dbMessage = req.body

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  })
})

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));

