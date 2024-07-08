const mongoose = require('mongoose');
async function connectToMongo(req,res,next){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        next();
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        next(error); // Pass the error to the next middleware
    }
}


module.exports= connectToMongo