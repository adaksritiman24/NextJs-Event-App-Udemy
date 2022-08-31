import isEmail from "validator/lib/isEmail";
import { connectDatabase, getAllDocuments, insertDocument } from "../../../helpers/dbUtils";
const { MongoClient } = require("mongodb");

const handler = async (req, res) => {
  const eventId = req.query.id;


  let client;
  try{
      client = await connectDatabase();
  }
  catch(e){
      res.status(500).json({message : "Connecting to database failed!"});
      return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!isEmail(email))
      return res.status(422).send({ status: "Unprocessable data" });

    const newComment = {
      eventId,
      email,
      name,
      text,
    };
    console.log(newComment);


    try{
        const result = await insertDocument(client, "comments", newComment);
        newComment._id = result.insertedId;
    }
    catch(e) {
        res.status(500).json({message : "Inserting comment failed!"});
        return;
    }
    client.close();

    return res
      .status(201)
      .send({ message: "new comment added successfully", comment: newComment });
  }



  if (req.method === "GET") {
    let documents;
    try{
        documents = await getAllDocuments(client, "comments", eventId, { _id: -1 });

    }catch(e){
        res.status(500).json({message : "Comment Fetching faild!"});
        return;
    }

    return res.status(200).json(documents);
  }
};

export default handler;
