const { MongoClient, ObjectId } = require("mongodb");


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
let db;
async function main(){
    const URI = "mongodb+srv://aswinyadav123:NUr9VQqiRC94SR5q@namastenode.twkfcmk.mongodb.net/";
    const client = new MongoClient(URI);
    try{
        await client.connect();
        db = client.db("userDetails");
        await  listDatabases(client);
        console.log("connected");
        // await insertUserDetails("user",[{name:"rishab",age:25,email:"rishab@gmail.com"},{name:"hassan",age:25,email:"hassan@gmail.com"},{name:"kk",age:25,email:"kk@gmail.com"}]);
        // console.log("inserted");
        await readUserDetails("user",{_id:new ObjectId('6840891a4b2496801fc4e250')}).then(data=>console.log(data));
    }
    catch(e){
        console.log(e);
    }
    finally{
        await client.close();
    }  
}
main().catch(console.error);




