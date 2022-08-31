import { connectDatabase, insertDocument } from "../../helpers/dbUtils";

const validator = require("validator");

const handler = async (req, res)=> {
    const {email} = req.body;
    console.log(email);
    if(!validator.isEmail(email)){
        return res.status(422).send({"status":"Invalid Input"});
    }
    
    let client;
    try{
        client = await connectDatabase();
    }
    catch(e){
        return res.status(500).json({message : "connecting to the database failed!"})
    }

    try{
        await insertDocument(client, "emails", {email});
        client.close();
    }
    catch(e){
        return res.status(500).json({message : "inserting data failed!"})
    }
 
    res.status(201).send({status: "created"})
}

export default handler;
