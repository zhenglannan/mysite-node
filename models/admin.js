var mongoose =require ('mongoose')

const Schema = mongoose.Schema;

var adminSchema=new Schema({
  user_name: {type:String,required:true},
  password: {type:String,required:true},
  email:{type:String,required:true},
  // id: Number,
  create_time: String,
  avatar: {type: String, default: '/images/default.jpg'},
})

adminSchema.index({email: 1});

var Admins = mongoose.model('Admins', adminSchema);

module.exports = Admins
