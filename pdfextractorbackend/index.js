const express=require("express")
const cors=require('cors')
const dotenv=require('dotenv').config()
const router=require('./Router/router')
//create express server

const pdfServer=express()

//parse json
pdfServer.use(express.json())

//data sharing

pdfServer.use(cors())


// Serve static files from the "uploads" directory
pdfServer.use('/uploads', express.static('uploads'));

pdfServer.use(router)

const PORT =4000 || process.env.PORT


pdfServer.listen(PORT,()=>
{
    console.log(`Server listening on PORT:${PORT}`)
})

