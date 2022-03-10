const args = require("minimist")(process.argv.slice(2));
const express = require('express')
const app = express()
args["port"]
p = args.port || 5000

const server = app.listen(p,() => {
    console.log('App is running on port: ' + p)
})

app.use(function (req,res){
    res.type("text/plain")
    res.status(404).end("Endpoint does not exist")
})

app.get('/app/', (req,res) => {
    res.status(200).end("OK")
})

app.get('/app/echo/:number',(req,res)=>{
    res.status(200).json({'message': req.params.number})
})
// const server = app.listen(port, () => {
//     console.log('App is running on port 5000')
// })

// app.use(function(req, res){
//     res.status(404).send("Endpoint does not exist")
//     res.type("text/plain")
// })

// app.get('/app/flip',(req,res)=>{
//     res.status(200).json({'flip':coinFlip()})
// })