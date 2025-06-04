const { MongoClient, ObjectId } = require("mongodb");

const URI = "mongodb+srv://aswinyadav123:NUr9VQqiRC94SR5q@namastenode.twkfcmk.mongodb.net/";
let db;
async function listDatabases(client){
    databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => console.log(`- ${db.name}`));
}

const insertUserDetails = async(docName,data)=>{
    await db.collection(docName).insertMany(data);
}
const readUserDetails = async(docName,filter)=>{
    let filterData = filter!==undefined?filter:{};
    return await db.collection(docName).find(filterData).toArray();
}
async function main(database,collectionName,operation,data){
    const client = new MongoClient(URI);
    try{
        await client.connect();
        db = client.db(database);
        // await  listDatabases(client);
        console.log("connected");
        if(operation === "insert"){
            await insertUserDetails(collectionName,data);
        }
        else if (operation === "read"){
            await readUserDetails(collectionName,filter).then(data=>console.log(data));
        }
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
        console.log("disconnected");
    }  
}
main().catch(console.error);

module.exports = main;




