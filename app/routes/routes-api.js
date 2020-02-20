module.exports = (app)=>{
    var verifyJWT = (req,res,next)=>{
        const token = req.headers['x-access-token'];
        if(!token){ 
            return res.status(500).send({auth:true,message:"Autenticação invalida!"});
        } else {
            req.app.locals.jwt.verify(token,process.env.SECRET,(err,decoded)=>{
                if(err){ res.status(500).send({auth:true,message:"Autenticação invalida!"});}
                req.userId = decoded.id; //(payload = id) foi indicado no método sign do login jwt.sign(payload, secretOrPrivateKey, [options, callback])
                next();
            }); 
        }
    }

    app.get('/api',verifyJWT,(req,res,next)=>{
        return res.status(200).send({ status: "ok"}); 
    })
}