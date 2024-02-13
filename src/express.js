import express from "express";

import ProductManager from "./componentes/index.js";

const app=express()
app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager();

const allProducts = productManager.loadProducts()
//console.log(await allProducts)

app.get("/products",async (req,res)=>{
    const limit =parseInt(req.query.limit)
    if(!limit){
        return res.send(await allProducts)
    }
    let products= await allProducts
    let limitProduct=products.slice(0, limit)
    res.send(limitProduct)
})

app.get("/products/:id",async (req,res)=>{
    const filtrarId = parseInt(req.params.id)
    let products= await allProducts
    let productId= products.find(product => product.id===filtrarId)
    res.send(productId)
})


const port=5500

const server= app.listen(port, ()=>{
    console.log(`Express en el puerto ${server.address().port}`)
})
server.on("error",(e)=>{
    console.log(`Error del servidor ${e}`)
})