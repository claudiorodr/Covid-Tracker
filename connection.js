const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ClaudioRodrigues:GnLbKeQp5bEIKnN0@cluster0-qqotr.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = {
    insert: async function (collection, data) {
        async function createListing() {
            const results = await client.db("Covid-19Tracker").collection(collection).insertOne(data);
            module.exports.results = results
        };

        try {
            await client.connect()
            await createListing(client)
        } catch (e) {
            console.error(e)
        } finally {
            // await client.close()
        }
    },
    findOne: async function (collection) {

        async function readListing() {

            const results = await client.db("Covid-19Tracker").collection(collection).findOne({}, {
                sort: {
                    $natural: -1
                }
            });
            module.exports.results = results
        };

        try {
            await client.connect()
            await readListing(client)
        } catch (e) {
            console.error(e)
        } finally {
            // await client.close()
        }
    },
}