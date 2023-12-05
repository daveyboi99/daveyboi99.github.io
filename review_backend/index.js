//database code
import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "dao/ReviewsDAO.js" //DAO = data access object



const MongoClient = mongodb.MongoClient; //make it easier to work with database

//getting access to usr and password, to get an environment variable, you need to use process.env
//const mongo_username = process.env['MONGO_USERNAME']; 
//const mongo_password= process.env['MONGO_PASSWORD'];

//uri is the connection string to the databse
//const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.f0tview.mongodb.net/`;  // using ` ` allows us to access js variables within the string, so in this case we can replace the password
const uri = `mongodb+srv://dave:1999d@cluster0.f0tview.mongodb.net/?retryWrites=true&w=majority`;
//recall that ${} is a placeholder within a string

//was 8000
const port = 5500; //this port is used as an alternate HTTP port, uses TCP


//connecting to db
//passing in uri and options wheen connecting
MongoClient.connect(
    uri,
    {
        maxPoolSize: 50, //setting the max amt of people can connect at one time
        wtimeoutMS: 2500, //in ms, if the user cannot connect within the time frame, we will issue a timeout
        useNewURLParser: true //alwyas set to true 
    }
)
.catch(err => { //catching any errors that may arise
    console.error(err.stack) //diplay error message on console, catching error from stack
    process.exit(1) //exit if encountered error
}
)
//after we connect to the db, then we do something
//creating an async fxn
//we chose async because instead with async we would be able to send multiple requests at once while with sync we wouldnt be able to
.then(async client => { //the client variable is coming from the connection to the data base
    //start the web server

    await ReviewsDAO.injectDB(client) //send our db connection to reviewsDAO
    //as soon as app.listen() gets executed, 
    app.listen(port, () => { //having the server listen in on the port for any client queries 
        console.log(`listening on port ${port}`)
    })
})











