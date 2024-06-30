const cluster = require('cluster')
const express = require('express')
const os = require('os')

const totalcpu = os.cpus().length
if(cluster.isPrimary){
    for(let i=0;i<totalcpu;i++){
        cluster.fork()
    }
} else{
    const app = express()
    require("dotenv").config()
    const PORT = process.env.PORT

    app.get("/",(req,res)=>{
      return res.json({message:`Welcome to our node js application using loadbalancer process id is ${process.pid}`})
    })
    
    app.listen(PORT,()=>{
        console.log(`server is started at ${PORT}`);
    })
}