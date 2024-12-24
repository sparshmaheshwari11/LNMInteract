const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")

router.use("/auth",authRoute)
router.use("/story",storyRoute)
router.use("/user",userRoute)


module.exports = router