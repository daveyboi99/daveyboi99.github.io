//this file is basically is all about getting info from the route and
//sending it to the reviewsdao which will access the database and get info
//back from the database


import ReviewsDAO from "../dao/reviewsDAO.js"; //using to actually access/update database


//exporting reviews controller to be able to import it in different filess
export default class ReviewsController {
    //needs to be static fxn because we can call fxn directly from ReviewsContoller
    //if it wasnt static, then we would need to create an instance of ReviewController
    //because its async, we can use await to wait for something to happen
    static async apiPostReview(req, res, next) {
        try {

            //fetching the info from the body of the requests
            const movieId = parseInt(req.body.movieId);
            const review = req.body.review;
            const user = req.body.user;
            
            //wait for the promise to be made in order to get the review
            //the promise waiting for addReview() to be executed in ReviewsDAO
            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review
            )

            res.json({status: "success"}) //once all of the above is done, we respond with a .json body saying succss
        }
        catch(e)
        {
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetReview(req, res, next)
    {
        try
        {   //the req.params.id is getting the vraible from the route/url, id, from reviews.route.js
            let id = req.params.id || {}; //either we get the id or an empty object

            let review = await ReviewsDAO.getReview(id); //get the review and wait to get a response until we move on
            
            //if no review is found then we respond with not found and return from the function
            if(!review) {
                res.status(404).json({ error: "Not found"})
                return
            }
            res.json(review) //else we respond with the actual review
        }
        catch(e)
        {
            //log the error
            console.log(`api. ${e}`); 
            res.status(500).json({error: e});
        }
    }





    //
    static async apiUpdateReview(req, res, next)
    {
        try
        {
            const reviewId = req.params.id;
            const review = req.body.review;
            const user = req.body.user;

            //getting response from database
            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review
            )

            //getting the error property from reviewResponse and setting putting it into error
            var {error}  = reviewResponse;

            if(error) 
            {
                res.status(400).json({error});
            }

            //the modified count checks if the review was change, return error if the review hasnt changed meaning we werent able to get the response
            if (reviewResponse.modifiedCount === 0)
            {
                throw new Error(
                    "unable to update review",

                )
            }

            res.json({status:"success"})
        }

        catch(e)
        {
            res.status(500).json({error: e.message})
        }
    }





    static async apiDeleteReview(req, res, next)
    {
        try
        {
            const reviewId = req.params.id;
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            res.json({status: "succss"})
        }
        catch(e)
        {
            res.status(500).json({ error: e.message})
        }
    }



    //getting a list of reviews for a specific movie
    static async apiGetReviews(req,res, next) {

        try {
            let id = req.params.id || {}; //this review is the movie id and not the review id
            let reviews = await ReviewsDAO.getReviewsByMovieId(id);

            if(!reviews)
            {
                res.status(404).json({error:"Not found"})
                return
            }
            res.json(reviews)
        }

        catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({error: e});
        }


    }



}
