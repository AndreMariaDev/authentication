const express = require('express');
const app = express();
const cookieParse = require('cookie-parser');
//pacote que implementa o protocolo JSON Web Token;
const jwt = require('jsonwebtoken');
//variaveis de ambiente relaciona os arquivos.env
require('dotenv-safe').load();

app.use(express.json());
app.use(express.urlencoded({extended:false})); // para poder utilizar o req.body
app.use(cookieParse());

app.listen(3000,(req,res)=>{
    //The app.locals object has properties that are local variables within the application.
    app.locals.jwt = jwt;
    require('./app/routes/routes-login')(app);
    require('./app/routes/routes-api')(app);
    console.log("Start Project");
})