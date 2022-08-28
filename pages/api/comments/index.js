const handler = (req, res)=> {
    if(req.method === "POST"){
        const {email, name, text} = req.body;
        console.log(email, name, text);
        res.status(201).send({"status": "new comment added successfully"});
    }
    if(req.method === "GET") {
        res.status(200).send([
            {id : 1, email : "adak@g.com", name: "Sritiman Adak", text : "very amazing comment!" }
        ]);
    }
}

export default handler;
