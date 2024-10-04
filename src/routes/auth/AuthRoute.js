const express=require('express');
const router=express.Router();


router.post('/login',login);
router.post('/signup',signup);
module.exports=router