require('dotenv').config({ path: "./.env" })
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const ChatRoute = require('./routes/ChatRoute')
const AuthRoute = require('./routes/AuthRoute')
const MessageRoute = require('./routes/MessageRoute')
const UserRoute = require('./routes/UserRoute')
connectDB()


const app = express();
const PORT = process.env.PORT || 5000

//middlewares
app.use(cors())
app.use(express.json());

//routes :
app.use("/chat", ChatRoute)
app.use("/auth", AuthRoute)
app.use("/user", UserRoute)
app.use("/message", MessageRoute)

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

app.get('/', (req, resp) => {
    resp.send('Welcome to mongoDB')
})