import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://localhost:27017/Wyzebot";

export async function ConnectectionCheck(): Promise<boolean> {
    const client = new MongoClient(uri);

    try {

        await client.connect();

        const response = await client.db('admin').command({ping: 1 });

        if (response.ok === 1) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function ListCharaters() {
    const client = new MongoClient(uri);

    try {

        await client.connect();

        const response = await client.db('Wyzebot').collection('characters').find().toArray();

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function CreateCharater(reqBody) {
    const client = new MongoClient(uri);

    try {

        await client.connect();

        const response = await client.db('Wyzebot').collection('characters').updateOne({name: reqBody.name}, {$set: reqBody}, {upsert:true});

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.close();
    }
}

export async function UpdateCharater(reqBody) {
    const client = new MongoClient(uri);

    try {

        await client.connect();

        const response = await client.db('Wyzebot').collection('characters').findOneAndUpdate({_id: new ObjectId(reqBody.id)},{
            $set: {
                name : reqBody.name,
                image : reqBody.image,
                powers: reqBody.powers
            }},{upsert:true});

        return response;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.close();
    }
}