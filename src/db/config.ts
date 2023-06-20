import mongoose from "mongoose"


const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN || "");
        console.log("Database online");

    } catch (error) {
        console.log(error);
        throw new Error("Database error, see logs for more information about the error")
    }
}



export default dbConnection;