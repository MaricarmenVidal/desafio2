import express from "express";

import ProductManager from "./componentes/index.js";

const app=express()
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager();

const allProducts = productManager.loadProducts()
//console.log(await allProducts)

app.get("/products",async (req,res)=>{
    //console.log(await allProducts)
    res.send(await allProducts)
})

const port=5500

const server= app.listen(port, ()=>{
    console.log(`Express por local host ${server.address().port}`)
})
server.on("error",(e)=>{
    console.log(`Error del servidor ${e}`)
})