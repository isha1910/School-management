const router=require("express").Router();
const Student=require("../models/Student.Model");

router.get("/", async(req,res)=>{
  res.json(await Student.find());
});

router.post("/", async(req,res)=>{
  res.json(await Student.create(req.body));
});

router.put("/:id", async(req,res)=>{
  await Student.findByIdAndUpdate(req.params.id,req.body);
  res.send("updated");
});

router.delete("/:id", async(req,res)=>{
  await Student.findByIdAndDelete(req.params.id);
  res.send("deleted");
});

module.exports=router;