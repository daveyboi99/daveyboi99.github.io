import express from "express" //back end web app framework for building RESTful APIs with node.js
import cors from "cors" // need for authorized resource sharing from third parties, use when you need to pull data from exteneral APIs that are public or authorized 
import reviews from "./API/reviews.route.js"

//accessing express
const app = express();

app.use(cors()); //using middleware, basically programs express is going use
//fyi json is used for storing temp data or serializing structured data and exhcanging it over a network, typically between a server and web applications
app.use(express.json()); //allow server to accept json in the body of a request

app.use("/API/v1/reviews", reviews); //url to access to send/recv information
app.use("*", (req, res) => res.status(404).json({error: "not found"})); //incase the user goes to a url that we didnt specify in our route file


export default app; //allows us to import app in the file that accesses the database, allows us to use code in between files

