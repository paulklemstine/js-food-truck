const router = require('express').Router()
const {getCollection, ObjectId} =require("../../../dbconnect.js")
let collectionEvents = null
let collectionMenu = null

const getMenu = async () =>{
    if (!collectionMenu) collectionMenu = await getCollection('FoodTruckAPI','Menu')
    return collectionMenu
}

const getEvents = async () =>{
    if (!collectionEvents) collectionEvents = await getCollection('FoodTruckAPI','Events')
    return collectionEvents
}

router.get('/menu/:id', async (request,response)=>{
    const {id} = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

router.get('/events/:id', async (request,response)=>{
    const {id} = request.params
    const collection = await getEvents()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

router.get('/menu', async (request,response)=>{
    const collection = await getMenu()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find any menu items' }})
})

router.get('/events', async (request,response)=>{
    const collection = await getEvents()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find any events' }})
})

router.post('/menu', async (request,response) =>{
    const { name, description, price,image_url } = request.body
    const collection = await getMenu();
    const {acknowledged, insertedId} = await collection.insertOne({name,description, price,image_url });
    response.send({acknowledged, insertedId});
})

router.post('/events', async (request,response) =>{
    const { name, location,date,time } = request.body
    const collection = await getEvents();
    const {acknowledged, insertedId} = await collection.insertOne({ name,location, date,time });
    response.send({acknowledged, insertedId});
})


module.exports = router