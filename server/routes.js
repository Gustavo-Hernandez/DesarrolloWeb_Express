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
    const {reservation} = req.body;
    if (reservation) {
        const {name, phoneNumber, email, uniqueId} = reservation;
        if (name && phoneNumber && email && uniqueId) {
            if (!reservationExists(uniqueId)) {
                const reservation = {name, phoneNumber, email, uniqueId}
                tables.length < 5 ? tables.push(reservation) : waitList.push(reservation)
                res.json({success: true, reservation});
            } else {
                return res.json({success: false, message:"Error reservation already exists."})
            }
        }else{
            return res.json({success: false,message:"Some data is missing."})
        }      
    } else {
        return res.json({success: false,message:"Request contains no data."})
    }
})

router.get("/api/waitlist", (req,res)=>{
    res.json(waitList)
})

router.post("/api/clear", (req, res)=>{
    tables = [];
    waitList = [];
    res.json({success: true});
});

function reservationExists(id){
    for (let i = 0; i < tables.length; i++) {
        if(tables[i].uniqueId == id){
            return true;
        }
    }
    for (let i = 0; i < waitList.length; i++) {
        if(waitList[i].uniqueId == id){
            return true;
        }
    }
    return false;
}

module.exports = router;