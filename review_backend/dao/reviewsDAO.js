import mongodb from "mongodb"


//the ObjectId acts as a primary key for a document in a collection. A document is basically a record
//recall that a primary key basically is a field that is used to distinguish other records from one another, ie customer name, etc. 
//we need to access the ObjecetId in order to uniquely identify a document in the db
//we're going to be sending and recieving text/intergers from our back end to our database
//the ObjectId is how we're able to search the database for a specific document
const ObjectId = mongodb.ObjectId;


let reviews;

//assigning the connection to the database

export default class ReviewsDAO {

    static async injectDB(conn) //getting a connection
    {
        if(reviews) //if there already is a database connection, dont do anything
        {
            return;
        }
        try{ //if there isnt a database connection, then connect
            //getting the connection from the file and then get the db called reviews
            //and then get the collection called reviews
            reviews = await conn.db("reviews").collection("reviews");
            
        }
        catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`);
        }
    }


    //fxn to add review to the database
    static async addReview(movieId, user, review )
    {
        try
        {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            }
            //db.collection.insertOne() is a method that takes a document as an argument and then inserts it in the collection
            //returns true if was succesful
            return await reviews.insertOne(reviewDoc);
        }
        catch(e)
        {
            console.error(`Unable to post review: ${e}`);
            return { error: e};
        }
    }


    //fxn to get review from the database
    static async getReview(reviewId)
    {
        try
        {
            //getting the specific document that satisfies the criteria given using the ObjectId
            //the arg is the criteria we're using to find the specific document
            //ObjectId(reviewId) is used to convert reviewId from a string to type ObjectId
            //_id is an actual field in mongodb, 
            return await reviews.findOne({_id: ObjectId(reviewId) });
        }
        catch(e)
        {
            console.error(`Unable to get review: ${e}`);
            return {error: e};
        }
    }


    //fxn to update the actual review
    static async updateReview(reviewId, user, review)
    {
        try
        {
            //db.collection.updateOne(filter, update, options) 
            const updateResponse = await reviews.updateOne(
                //finding the specific document to update
                {
                  _id: ObjectId(reviewId)  
                },
                { 
                    //to modifications to apply to the document
                    //$set is an operator that  replaces the value of a field with the specified value
                    //here we're only updating the user who wrote the review and the contents of the review
                    $set: {user: user, review: review}
                }
            )
            //updatedRespone contains the rv of UpdateOne() which is a document that contains the following:
            //1) matchedCount: counts # of matched documents
            //2) modifiedCount: counts # of modified documents
            //3) upsertedId: the _id for the upserted document
            //4) acknowledged: a boolean that returns true if succesfull and false otherwise

            return updateResponse;
        }
        catch(e)
        {
            console.error(`Unable to update review: ${e}`);
            return {error: e};
        }
    }


    //fxn to delete a specific review given the review id

    static async deleteReview(reviewId)
    {
        try{
            //.deleteOne() returns bool as true if the operation was completed sucessfully meaning that it was able to find the review and deleted from the collection
            const deleteResponse = await reviews.deleteOne(
                {
                    //the first arg in this fxn is the filter criteria, in this case being delete the first matching review with this id
                    _id: ObjectId(reviewId),
                }
            )
            //when the above has executed, the return value of the operation, which is going to deleteResponse, is a document that has two field which:
            //1) acknowledged, 1 meaning the operation is successful and 0 otherwise
            //2) deleteCount, which counts the total number of deleted documents from the collection after the operation was performed
            return deleteResponse;
        }
        catch (e)
        {
            console.error(`Unable to delete review: ${e}`);
            return { error: e}
        }
    }

    //get all of the reviews for a specific movie
    //this time we're passing in an interger instead of an object
    static async getReviewsByMovieId(movieId)
    {
        
        try
        {
            //.find() is a built in fxn for arrays in js; however, we can use it for finding documents (or objects) in a collection (which can be considered arrays)
            //here were passing in an object to find in the collection
            //it returns a list of reviews with the specified movieId
            const cursor = await reviews.find(
                {
                    //parse int converts a string into an interger
                    //the reason we need to do so is because in each object, movieId is an int, so we need to convert it from string to int
                    movieId: parseInt(movieId)
                }
            )
            //return the reviews, need to convert to an array
            return cursor.toArray()
        }
        catch (e)
        {
            console.error(`Unable to get review: ${e}`);
            return {error: e};
        }
    }


}