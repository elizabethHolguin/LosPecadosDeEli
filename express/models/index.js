var mongoose = require('mongoose');

DATABASE_URL = "mongodb+srv://admineli:blNVAZ6hr7shCBQ0@cluster0.a6bw7.gcp.mongodb.net/pecadoseli?retryWrites=true&w=majority"

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB connnection successful!'))
.catch(err => {
    console.error.bind(console, 'MongoDB connection error:')
});

/*
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://edangonz:<password>@cluster0.gianj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("test").collection("devices");
      // perform actions on the collection object
      client.close();
    });
    */