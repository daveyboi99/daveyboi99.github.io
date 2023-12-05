import express from "express"
import ReviewsCtrl from "controller.js"

//when people click the url, it will route the request to diff parts of our application
const router = express.Router();

//the arg for route() in this case is just "/" because it servers as the base route
//router.route("/").get((req, res)=> res.send("hello world")); //send the result to whoever requsted the route





//calling fxns in the review controller depending on the which route we take

//having a colon in a route makes id an actual variable we have access to in our reviews controller
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews); //getting the review of the movie specified in the url
router.route("/new").post(ReviewsCtrl.apiPostReview); //posting the new review

//grouping http requests for the same route
router.route("/:id")//this is the review id, not the movie id
    .get(ReviewsCtrl.apiGetReviews) //if its a get request, we execut this fxn and so on
    .put(ReviewsCtrl.apitUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router; //allows us to import the route in a different file

