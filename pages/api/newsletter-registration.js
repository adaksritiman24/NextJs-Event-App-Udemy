const validator = require("validator");

const handler = (req, res)=> {
    const {email} = req.body;
    console.log(email);
    if(!validator.isEmail(email)){
        return res.status(422).send({"status":"Invalid Input"});
    }
    res.status(201).send({status: "created"})
}

export default handler;
