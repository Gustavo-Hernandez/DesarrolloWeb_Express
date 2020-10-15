const express = require("express");
const path = require("path");
const router = express.Router();

var tables = [];
var waitList = []; 


//Render routes
router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"../home.html"));
});
router.get("/tables", (req, res)=>{
    res.sendFile(path.join(__dirname,"../tables.html"));
});
router.get("/reserve", (req, res)=>{
    res.sendFile(path.join(__dirname,"../reserve.html"));
});

//Table methods
router.get("/api/tables", (req,res)=>{
    res.json(tables)
})

router.post("/api/reservation",(req, res)=>{
    const {name, phoneNumber, email, uniqueId} = req.body;
    if (name && phoneNumber && email && uniqueId) {
        const reservation = {name, phoneNumber, email, uniqueId}
        tables.length < 5 ? tables.push(reservation) : waitList.push(reservation)
        res.status(200).json({success: true, reservation});
    }else{
        return res.status(400).json({success: false,error:"Some data is missing."})
    }
})

router.get("/api/waitlist", (req,res)=>{
    res.json(waitList)
})

router.post("/api/clear", (req, res)=>{
    tables = [];
    waitList = [];
    res.status(200).json({success: true, message:"Data has been cleared."});
});

module.exports = router;