const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware here
app.use(express.json());
app.use(cors())

const userId = process.env.USER_ID;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${userId}:${password}@helpdeskdatabase.ub6zcvv.mongodb.net/?retryWrites=true&w=majority&appName=HelpDeskDatabase`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();

        const db = client.db("HelpDask");
        const issuesCollection = db.collection("issues");
        const adminReqCollection = db.collection("adminReqests");
        const userFeedbackCollection = db.collection("feedback");


        app.post("/admin-req",async(req,res) => {
            const body = req.body;
            const result = await adminReqCollection.insertOne(body);
            if (result?.insertedId) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({
                    message: "can not insert try again later",
                    status: false,
                });
            }
        })

        app.post("/send-feedback", async (req, res) => {
            const { feedback, user, userName } = req.body;
            try {
                await userFeedbackCollection.insertOne({
                    feedback,
                    user,
                    userName,
                    createdAt: new Date()
                });
                res.status(200).json({ success: true, message: "Feedback submitted successfully" });
            } catch (error) {
                res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        })

        // post a issue
        app.post("/post-issue", async (req, res) => {
            const body = req.body;
            body.createdAt = new Date();
            // console.log(body);
            const result = await issuesCollection.insertOne(body);
            if (result?.insertedId) {
                return res.status(200).send(result);
            } else {
                return res.status(404).send({
                    message: "can not insert try again later",
                    status: false,
                });
            }
        });

        // get all issues 
        app.get("/all-issues", async (req, res) => {
            const issues = await issuesCollection
                .find({})
                .toArray();
            res.send(issues);
        });

        // get single issue using id
        app.get("/all-issues/:id", async (req, res) => {
            // console.log(req.params.id);
            const issues = await issuesCollection.findOne({
                _id: new ObjectId(req.params.id),
            });
            res.send(issues);
        });

        // get issues based on email for my issue listing 
        app.get("/myIssues/:email", async (req, res) => {
            // console.log("email---", req.params.email);
            const issues = await issuesCollection
                .find({
                    postedBy: req.params.email,
                })
                .toArray();
            res.send(issues);
        });

        // delete a issue
        app.delete("/issue/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await issuesCollection.deleteOne(filter);
            res.send(result);
        })

        // update a issue
        app.patch("/update-issue/:id", async (req, res) => {
            const id = req.params.id;
            const issueData = req.body;
            // console.log(body);
            const filter = { _id: new ObjectId(id) };
            const updateDoc = {
                $set: {
                    ...issueData
                },
            };
            const options = { upsert: true };
            const result = await issuesCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        // New endpoint to get issue statistics
        app.get("/issue-stats", async (req, res) => {
            const total = await issuesCollection.countDocuments();
            const pending = await issuesCollection.countDocuments({ issueStatus: "Pending" });
            const processing = await issuesCollection.countDocuments({ issueStatus: "Processing" });
            const solved = await issuesCollection.countDocuments({ issueStatus: "Solved" });

            const high = await issuesCollection.countDocuments({ priorityType: "High" });
            const medium = await issuesCollection.countDocuments({ priorityType: "Medium" });
            const low = await issuesCollection.countDocuments({ priorityType: "Low" });

            const issueTypes = await issuesCollection.aggregate([
                {
                    $group: {
                        _id: {
                            date: { $substr: ["$issueDate", 0, 10] }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: {
                        "_id.date": 1
                    }
                },
                {
                    $project: {
                        date: "$_id.date",
                        count: "$count",
                        _id: 0
                    }
                }
            ]).toArray();

            res.send({
                issueStats: { total, pending, processing, solved },
                priorityStats: { high, medium, low },
                issueTypes
            });
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
