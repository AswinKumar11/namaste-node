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
async function main(database,collectionName,operation,data,filter){
    const client = new MongoClient(URI);
    try{
        await client.connect();
        db = client.db(database);
        // await  listDatabases(client);
        console.log("connected");
        if(operation === "insert"){
            let insertedData = await insertUserDetails(collectionName,data);
            return insertedData;
        }
        else if (operation === "read"){
            let readData = await readUserDetails(collectionName,filter);
            return readData;
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




