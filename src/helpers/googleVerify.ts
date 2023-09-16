import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


async function googleVerify(token: string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, 
      
  });
// as any needs TODO:
  const {name, picture: img, email} = ticket.getPayload() as any;
  
  return {
    name,
    img,
    email
  }
}


export {googleVerify};