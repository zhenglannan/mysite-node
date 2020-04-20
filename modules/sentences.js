var mongoose=require('mongoose')
var Schema=mongoose.Schema
var homeRecomSentence =require('../initData/homeRecomSentence')

var senSchema=new Schema({
  id:{type:Number,required:true},
  content:{type:String,required:true},
  cntComment:Number,
  ctnLike:Number,
  referAuthorName:String,
  referWorkId:String,
  referWorkName:String,
  creator:{
    uuid:Number,
    username:String,
    avator:{type:String,default:'default.jpg'},
    intro:String
  }
})

// senSchema.index({id: 1});

var SentenceRecommends = mongoose.model('SentenceRecommends', senSchema);
SentenceRecommends.find({},function(err, data){
	if (!data) { 
    homeRecomSentence.forEach(item=>{
      Sentences.create(item);
    })
	}
})

module.exports=Sentences