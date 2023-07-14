const express = require('express');

const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.port || 8000;
app.listen(port);
const secretKey = "ggjdkjgkdjkgdjjgkdkgddkfkd44djnf";
app.post("/login", (request, response) => {
    const user = {
        id: 1,
        name: "murari",
        email: "murari@getMaxListeners.com"
    }
    jwt.sign({ user }, secretKey, { expiresIn: 300 }, (error, token) => {
        response.json({
            token
        })
    })
})

app.post("/profile",verifyToken, (request, response) => {
jwt.verify(request.token,secretKey,(error,authData)=>{
    if(error){
        response.send("invalid token")
    }
    else{
        response.json({
            message:"profile acess",
            authData
        })
    }
})
})
function verifyToken(request, response, next){
    const bearerHeader =  request.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        request.token=token;
        next();

    }
    else {
        response.send("authentication failed");
    }
}