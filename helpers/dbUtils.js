const {MongoClient} = require("mongodb");

export const connectDatabase = async()=> {
    const URL = "mongodb+srv://eventsdb:root@cluster0.8l4ux84.mongodb.net/?retryWrites=true&w=majority"
    const client = await MongoClient.connect(URL);
    return client;
}

export const insertDocument = async(client, collection, document)=>{
    const db = client.db("events");
    const collectionObj = db.collection(collection);

    await collectionObj.insertOne(document);
}

export const getAllDocuments = async(client, collection, eventId,  sortObj)=> {
    const db = client.db("events");
    const collectionObj = db.collection(collection);

    const documents =await collectionObj
    .find({ eventId })
    .sort(sortObj)
    .toArray();

    return documents;
}