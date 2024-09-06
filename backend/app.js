require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const database_connection = require("./db");
const loginRouter = require("./routers/login");
const availabilityRouter = require("./routers/availability");
const sessionRouter = require("./routers/session");
const getAllUserRouter = require("./routers/get-all-user");
const getAvailabilityRouter = require("./routers/get-availability");

app.use(express.json());
app.use(cors());
app.use("/api", loginRouter);
app.use("/api", availabilityRouter);
app.use("/api", sessionRouter);
app.use("/api", getAllUserRouter);
app.use('/api', getAvailabilityRouter);

app.get('/', (req, res) => {
    res.send("hello this root");
});

const PORT = 3000;

database_connection().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    })
});