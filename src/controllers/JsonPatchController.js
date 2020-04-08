const JsonPatch = require('fast-json-patch');
module.exports = {
  index(req, res){
    const {jsonObject, patch} = req.body;
    if(typeof jsonObject !== 'object' || !Array.isArray(patch)){
      return res.status(400).send({err: 'jsonObject must be a json and patch must be an Array'});
    }else{
      const result = JsonPatch.applyPatch(jsonObject, patch).newDocument;
      return res.status(200).send({result});
    }
  }
};