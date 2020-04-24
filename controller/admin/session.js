var crypto =require ('crypto')

function encryption(password){
  const newPassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
  return newPassword;
}

function Md5(password){
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('base64');
};

module.exports=encryption