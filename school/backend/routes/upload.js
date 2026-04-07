const router=require("express").Router();
const multer=require("multer");
const Assignment=require("../models/Assignment.Model");

const storage=multer.diskStorage({
  destination:"uploads/",
  filename:(req,file,cb)=>{
    cb(null,Date.now()+"-"+file.originalname);
  }
});

const upload=multer({storage});

router.post("/", upload.single("file"), async(req,res)=>{
  await Assignment.create({file:req.file.filename});
  res.send("uploaded");
});

router.get("/files", async(req,res)=>{
  const data=await Assignment.find();
  res.json(data.map(d=>d.file));
});

module.exports=router;