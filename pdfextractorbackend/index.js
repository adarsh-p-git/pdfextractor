const express=require("express")
const cors=require('cors')
const dotenv=require('dotenv').config()
const router=require('./Router/router')
//create express server

const pdfServer=express()

//data sharing

pdfServer.use(cors())

//parse json

pdfServer.use(express.json())

pdfServer.use(router)

const PORT =4000 || process.env.PORT


pdfServer.listen(PORT,()=>
{
    console.log(`Server listening on PORT:${PORT}`)
})

