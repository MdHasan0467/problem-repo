const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//! Middleware......
app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://Social-Media:WT1S7XrEJfx9tT5p@cluster0.y0hhy5e.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

// db =
// "mongodb+srv://Social-Media:WT1S7XrEJfx9tT5p@cluster0.y0hhy5e.mongodb.net/Social-Media-ST?retryWrites=true&w=majority&appName=Cluster0";

// const uri = `mongodb+srv://Social-Media:WT1S7XrEJfx9tT5p@cluster0.y0hhy5e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb://Social-Media:WT1S7XrEJfx9tT5p@ac-myoyis5-shard-00-00.y0hhy5e.mongodb.net:27017,ac-myoyis5-shard-00-01.y0hhy5e.mongodb.net:27017,ac-myoyis5-shard-00-02.y0hhy5e.mongodb.net:27017/?ssl=true&replicaSet=atlas-d84rwm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

//

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log("DB Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

app.get("/", (req, res) => {
  res.send("Smart Thrill Server is running");
});

// https://smart-thrill-social-media-server.vercel.app
// http://localhost:5000/

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Data Collections = = = = = = = = = = =
const db = client.db("Smart-Thrill");

//! User Collection
const userCollection = db.collection("Users");

//! Added Products Collection
// const db.collection("Posts") = db.collection("Posts");

//! Added Products Collection
//   const db.collection("Advertise") = db.collection("Advertise");

//! Added Chat Collection
//   const db.collection("Chat") = db.collection("Chat");

//! Added friend-request Collection
//   const db.collection("friend-requests") = db.collection("friend-requests");

//! Added friend-request-accept Collection
//   const db.collection("friend-List") = db.collection("friend-List");

//!!!! https:///smart-thrill-social-media-server.vercel.app
//!!!! https:///smart-thrill-server.vercel.app

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL get APIs = = = = = = = = = = =

//! < Start >  get admin ======>
app.get("/admin", async (req, res) => {
  const query = { role: "admin" };
  console.log(query);
  const result = await userCollection.findOne(query);
  res.send(result);
});

//!======END======>

//! < Start >  get all user ======>
app.get("/all-user", async (req, res) => {
  const query = {};
  const result = await userCollection.find(query).toArray();
  console.log(result);
  res.send(result);
});

//!======END======>

//! < Start >  get Reels ======>
app.get("/reels", async (req, res) => {
  const query = { category: "reels" };
  const result = await (
    await db.collection("Posts").find(query).toArray()
  ).reverse();
  res.send(result);
});

//!======END======>

//! < Start >  get messages ======>
app.get("/api/messages", async (req, res) => {
  const query = {};
  const result = await db.collection("Chat").find(query).toArray();
  res.send(result);
});

//!======END======>

// //! < Start >  get All Data by pagination ======>
// app.get('/allData', async (req, res) => {
// 	const page = parseInt(req.query.page);
// 	const dataSize = parseInt(req.query.dataSize);
// 	const query = {};
// 	const result = await (await db.collection("Posts").find(query).skip(page*dataSize).limit(dataSize).toArray());
// 	const count = await db.collection("Posts").estimatedDocumentCount();
// 	 //TODO: koto gulo data ase seita count korar jonno...
// 	res.send({ count, result })
// })

// //!======END======>

//! < Start >  get All Data ======>
app.get("/allData", async (req, res) => {
  const query = {};
  const result = await db.collection("Posts").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all status ======>
// app.get('/status', async (req, res) => {
// 	const page = parseInt(req.query.page);
// 	const dataSize = parseInt(req.query.dataSize);
// 	const query = {};
// 	const result = await (await db.collection("Posts").find(query).skip(page*dataSize).limit(dataSize).toArray());
// 	const count = await db.collection("Posts").estimatedDocumentCount();
// 	//TODO: koto gulo data ase seita count korar jonno...
// 	res.send({ count, result })
// })

//!======END======>

//! < Start >  get ads ======>
app.get("/ad-center", async (req, res) => {
  const query = {};
  const result = await db.collection("Advertise").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all user ======>
app.get("/my-friends", async (req, res) => {
  const query = {};
  const result = await db.collection("Users").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all users without current user ======>
app.get("/contact-friend/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const query = { email: { $ne: email } }; // find all users except current user
  const result = await db.collection("Users").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get all users without current user ======>
app.get("/search/:name", async (req, res) => {
  const name = req.params.name;
  // console.log(email)
  const query = { email: { $ne: email } }; // find all users except current user
  const result = await db.collection("Users").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated photos by specific email ======>
app.get("/photos/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "photos" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"photos"} is for finding category

  const result = await db.collection("Posts").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated status by specific email ======>
app.get("/status/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "status" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"status"} is for finding category

  const result = await db.collection("Posts").find(query).toArray();
  res.send(result);
});

//!======END======>

//! < Start >  get last updated feelings by specific email ======>
app.get("/feelings/:email", async (req, res) => {
  const email = req.params.email;
  const query = { authorEmail: email, category: "feelings" };

  //TODO: first query {authorEmail: email} is for finding user
  //TODO: And second query {category:"feelings"} is for finding category

  const result = await db.collection("Posts").find(query).toArray();
  res.send(result);
});

//!======END======>

//!======START <- get user posted data  by user email ======>
app.get("/data/:email", async (req, res) => {
  const email = req.params.email;
  const data = { authorEmail: email };
  const result = await db.collection("Posts").find(data).toArray();
  res.send(result);
});

app.get("/like/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await db.collection("Posts").findOne(filter);
  res.send(result);
});

app.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await db.collection("Posts").findOne(filter);
  res.send(result);
});

// !======START <- get message For sender email ======>
app.get("/chat/receiverEmail/:email", async (req, res) => {
  const receiver = req.params.email;
  // console.log('receiver',req.params)
  const user = { receiverEmail: receiver };

  app.get("/chat/senderEmail/:email", async (req, res) => {
    const sender = req.params.email;
    // console.log('sender',req.params)
    const user = { senderEmail: sender };
  });

  if (" sender && receiver") {
    const result = await (
      await db.collection("Chat").find(user).toArray()
    ).reverse();
    res.send(result);
    // console.log('msg',result)
  } else {
    res.status(400).json({ errors: [{ msg: "message not available" }] });
  }
});

// !============>

//!======START <- get message For receiver email ======>
app.get("/chatCome/receiverEmail/:email", async (req, res) => {
  const sender = req.params.email;
  console.log("senderCome", req.params);
  const user = { senderEmail: sender };

  app.get("/chatCome/senderEmail/:email", async (req, res) => {
    const receiver = req.params.email;
    console.log("receiverCome", req.params);
    const user = { receiverEmail: receiver };
  });

  if ("receiver && sender") {
    const result = await (
      await db.collection("Chat").find(user).toArray()
    ).reverse();
    res.send(result);
    console.log("msgCome", result);
  } else {
    res.status(400).json({ errors: [{ msg: "message not available" }] });
  }
});

// !======END======>

//!======START <- get user for AuthContext by user email ======>
app.get("/dynamic/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const result = await db.collection("Users").findOne(user);
  res.send(result);
});

// !======END======>

//!======START <- get Dynamic-Friend-Request-List by user email ======>
app.get("/Dynamic-Friend-Request-List/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const user = { frndRqstReceiverEmail: email };
  const result = await db.collection("friend-requests").find(user).toArray();
  res.send(result);
});

// !======END======>

//!======START <- get Dynamic-Friend-List  by user email ======>
app.get("/Dynamic-Friend-List/:email", async (req, res) => {
  const email = req.params.email;
  const user = { frndRqstReceiverEmail: email };
  // console.log(user)
  const result = await db.collection("friend-List").find(user).toArray();
  res.send(result);
});

// !======END======>

//!======START <- get user for AuthContext by user email ======>
app.get("/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const result = await db.collection("Users").findOne(user);
  res.send(result);
});

// !======END======>

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL post APIs = = = = = = = = = = =

//! < Start >  add a new user ======>
app.post("/users", async (req, res) => {
  const user = req.body;
  const email = user.email;
  const filter = await db.collection("Users").findOne({ email: email });
  if (filter === null) {
    const result = await db.collection("Users").insertOne(user);
    res.send(result);
  } else {
    res.status(400).json({ errors: [{ msg: "User already exists" }] });
  }

  //TODO: Jodi user already data base a store thake taholy 400 message ta dekhabe.... R jodi user already data base a store na thake taholy data ta insert hobe.
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/status", async (req, res) => {
  const status = req.body;
  const result = await db.collection("Posts").insertOne(status);
  res.send(result);
});

//!======END======>

//! < Start >  add a new message ======>
app.post("/api/messages", async (req, res) => {
  const message = req.body;
  const result = await db.collection("Chat").insertOne(message);
  res.send(result);
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/reels", async (req, res) => {
  const reel = req.body;
  const result = await db.collection("Posts").insertOne(reel);
  res.send(result);
});

//!======END======>

//! < Start >  add a new status ======>
app.post("/message", async (req, res) => {
  const message = req.body;
  const result = await db.collection("Chat").insertOne(message);
  res.send(result);
});

//!======END======>

//! < Start >  send friend-request ======>
app.post("/friend-request", async (req, res) => {
  const send = req.body;
  const result = await db.collection("friend-requests").insertOne(send);
  res.send(result);
});

//!======END======>

//! < Start >  send friend-request-accept ======>
app.post("/friend-request-accept", async (req, res) => {
  const send = req.body;
  const result = await db.collection("friend-List").insertOne(send);
  res.send(result);
});

//!======END======>

//! < Start >  add a new Advertise ======>
app.post("/ad-center", async (req, res) => {
  const query = req.body;
  const result = await db.collection("Advertise").insertOne(query);
  res.send(result);
});

//!======END======>

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Update APIs = = = = = = = = =

//! update an user friend-request by using it's email

app.put("/update-friend-request/:email", async (req, res) => {
  const email = req.params.email;
  // console.log(email)
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      friendRequestedatabasey: data.friendRequestedatabasey,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
  console.log(result);
});

//! update an like by clicking home page like button using it's ID

app.put("/like/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  // console.log('filter', filter);
  const option = { upsert: true };
  const updatedData = {
    $set: {
      likerName: data.likerName,
      likerEmail: data.likerEmail,
      LikerImage: data.LikerImage,
      likes: data.likes,
    },
  };
  const result = await db
    .collection("Posts")
    .updateOne(filter, updatedData, option);
  // console.log(result);
  res.send(result);
});

app.put("/unlike/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  // console.log('filter', filter);
  const option = { upsert: true };
  const updatedData = {
    $set: {
      likerName: data.likerName,
      likerEmail: data.likerEmail,
      LikerImage: data.LikerImage,
      likes: data.likes,
    },
  };
  const result = await db
    .collection("Posts")
    .updateOne(filter, updatedData, option);
  // console.log(result);
  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/description/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      description: data.description,
    },
  };
  const result = await db
    .collection("Posts")
    .updateOne(filter, updatedData, option);

  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/update-cover-photo/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      coverPhoto: data.coverPhoto,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
});

//! Update User Social Medial in profile page using it's ID

app.put("/update-social-media/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      facebookURL: data.facebookURL,
      githubURL: data.githubURL,
      linkedinURL: data.linkedinURL,
      twitterURL: data.twitterURL,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
});

//! update an post by clicking profile page update button using it's ID

app.put("/update-intro/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      updaterName: data.updaterName,
      updaterImage: data.updaterImage,
      updaterEmail: data.updaterEmail,
      intro: data.intro,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
});

//! update User profile photo in profile page  using user email

app.put("/update-profile/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  // console.log('first')
  const option = { upsert: true };
  const updatedData = {
    $set: {
      image: data.image,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
});

//! update User profile photo in every post  using user email

app.put("/update-authorProfile/:email", async (req, res) => {
  const email = req.params.email;
  const user = { authorEmail: email };
  const data = req.body;

  const option = { upsert: true };
  const updatedData = {
    $set: {
      authorImage: data.image,
    },
  };
  const result = await db
    .collection("Posts")
    .updateMany(user, updatedData, option);

  res.send(result);
  // console.log(result)
});

//! update User name in profile page  using user email

app.put("/update-name/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      name: data.name,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);
  // console.log(result)
  res.send(result);
});

//! update author name in every post  using user email

app.put("/update-authorName/:email", async (req, res) => {
  const email = req.params.email;
  const user = { authorEmail: email };
  const data = req.body;

  const option = { upsert: true };
  const updatedData = {
    $set: {
      authorName: data.authorName,
    },
  };
  const result = await db
    .collection("Posts")
    .updateMany(user, updatedData, option);

  res.send(result);
  console.log(result);
});

//! update User email in profile page  using user email

app.put("/update-email/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      email: data.email,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);
  console.log(result);
  res.send(result);
});

//! update User phone number in profile page  using user email

app.put("/update-phoneNumber/:email", async (req, res) => {
  const email = req.params.email;
  const user = { email: email };
  const data = req.body;
  const option = { upsert: true };
  const updatedData = {
    $set: {
      phoneNumber: data.phoneNumber,
    },
  };
  const result = await db
    .collection("Users")
    .updateOne(user, updatedData, option);

  res.send(result);
});

//!FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:FIXME:
//todo = = = = = = ALL Delete APIs = = = = = = = = = = =

//! < Start >  Delete status by its ID ======>
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("Posts").deleteOne(query);
  res.send(result);
});

//!======END======>

//! < Start >  Delete friend request by its ID ======>
app.delete("/post/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await db.collection("friend-requests").deleteOne(query);
  res.send(result);
});

//!======END======>

//! ===================< THE END >===================
//! ===================< *** *** >===================

app.listen(port, () => {
  console.log(`Smart Thrill Server is running on port ${port}`);
});
