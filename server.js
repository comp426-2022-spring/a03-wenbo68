// import { coinFlip } from "./modules/modules.mjs";
const args = require("minimist")(process.argv.slice(2));
const express = require('express')
const app = express()
args["port"]
p = args.port || 5000

const server = app.listen(p,() => {
    console.log('App is running on port: ' + p)
})

app.get('/app', (req,res) => {
    res.status(200).end("200 OK")
})

app.get('/app/echo/:number',(req,res)=>{
    res.status(200).json({'message': req.params.number})
})

function coinFlip() {
    let x=Math.floor((Math.random() * 10) + 1);
    if(x<6){
      return "heads";
    }else{
      return "tails";
    }
  }

app.get('/app/flip',(req,res)=>{
    res.status(200).json({'flip':coinFlip()})
})

function coinFlips(flips) {
    const result=[];
    for(let i=0; i<flips; i++){
      result.push(coinFlip());
    }
    return result;
}
function countFlips(array) {
    let numHead=0;
    let numTail=0;
    for(let i=0;i<array.length;i++){
      if(array[i]=="heads"){
        numHead++;
      }else{
        numTail++;
      }
    }
    return {heads: numHead, tails: numTail};
}
// var arr = coinFlips(5);
// console.log(arr);
// console.log(countFlips(arr));

app.get('/app/flips/:number',(req,res) =>{
    var arr = coinFlips(req.params.number);
    var count = countFlips(arr);
    res.status(200).json({'raw':arr,'summary':count});
})

function flipACoin(call) {
    let result = '';
    let flip=coinFlip();
    if (call==flip){
      result='win';
    }else{
      result='lose';
    }
    return {call: call, flip: flip, result: result};
  }

app.get('/app/flip/call/:string',function (req,res){
    res.status(200).json(flipACoin(req.params.string));
})
app.use(function (req,res){
    res.type("text/plain")
    res.status(404).end("404 Not Found")
})
// const server = app.listen(port, () => {
//     console.log('App is running on port 5000')
// })

// app.use(function(req, res){
//     res.status(404).send("Endpoint does not exist")
//     res.type("text/plain")
// })

