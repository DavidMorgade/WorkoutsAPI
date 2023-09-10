import jsonwebtoken from "jsonwebtoken";



const generateJWT = (uid: string) => {
    return new Promise((resolve, reject) => {

        const payload = {uid};

        jsonwebtoken.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, {
            expiresIn: "4h"
        }, (err, token) => {

            if(err) {
                console.log(err.message);
                reject("Token could not be generated")
            } else {
                resolve(token);
            }
        });


    });

} 



export default generateJWT;