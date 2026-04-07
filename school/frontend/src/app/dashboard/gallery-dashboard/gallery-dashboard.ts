import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
selector:'app-gallery-dashboard',
standalone:true,
imports:[CommonModule,FormsModule],
templateUrl:'./gallery-dashboard.html',
styleUrl:'./gallery-dashboard.scss'
})
export class GalleryDashboard implements OnInit{

gallery:any[]=[];
isEdit=false;

galleryData:any={
_id:'',
title:'',
date:'',
images:''   // string input
}

constructor(private api:Api){}

ngOnInit(){
this.getGallery();
}

getGallery(){
this.api.getGallery().subscribe((res:any)=>{

// ✅ FIX: ensure images always array
this.gallery = (res.data || []).map((g:any)=>({
  ...g,
  images: Array.isArray(g.images)
    ? g.images
    : (g.images ? g.images.split(',').map((i:any)=>i.trim()) : [])
}));

})
}

saveGallery(){

if(!this.galleryData.title){
alert("Enter title");
return;
}

const payload={
...this.galleryData,
images:this.galleryData.images   // string → backend convert karega
};

if(this.isEdit){

this.api.updateGallery(this.galleryData._id,payload)
.subscribe(()=>{
this.getGallery();
this.resetForm();
})

}else{

this.api.addGallery(payload)
.subscribe(()=>{
this.getGallery();
this.resetForm();
})

}

}

editGallery(g:any){

this.galleryData={
...g,
images: Array.isArray(g.images)
  ? g.images.join(", ")
  : g.images
};

this.isEdit=true;
}

deleteGallery(id:any){
if(confirm("Delete gallery?")){
this.api.deleteGallery(id).subscribe(()=>{
this.getGallery();
})
}
}

resetForm(){
this.galleryData={
_id:'',
title:'',
date:'',
images:''
};
this.isEdit=false;
}

}