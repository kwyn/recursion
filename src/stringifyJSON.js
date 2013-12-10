// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to have to write it from scratch:
var stringifyJSON = function (obj) {
  // your code goes here
  //check if obj is actually an Array
  if( Array.isArray(obj) ){
    //Check for empty array
    //if not empty iterate and make function string to recurse to stringyJSON with each item in the array
    if( obj.length > 0 ){
      var struct = " '[' ";
      for(var i = 0; i < obj.length; i++){
        struct += "+ stringifyJSON(obj["+i+"]) ";
        if( i < obj.length-1 ){
          struct += "+ ',' ";
        }else{
          struct += "+ ']'";
        }
      }
    //recursive call
    return eval(struct);
    //for empty array element return '[]'
    //end case
    }else{
      return "[]";
    }
  //check if obj is an Object
  }else if( typeof obj == "object" ){
    //check for null case
    //end case
    if( obj === null ){
      return "null";
    //check for empty object
    }else if( Object.keys(obj).length > 0 ){
      //store keys into a variable for easy of reading
      var keys = Object.keys(obj);
      //if not empty iterate and make function string to recurse to stringyJSON with object keys and values
      var struct = " '{' ";
      for(var i = 0; i < keys.length ; i++){
        if( (obj[keys[i]] == undefined && obj[keys[i]] !== null) || typeof obj[keys[i]] == "function" ){
          struct += " + stringifyJSON(obj[\""+keys[i]+"\"])";
        }else{
          struct += "+ '\""+keys[i]+"\":'+ stringifyJSON(obj[\""+keys[i]+"\"])";
          if( i < keys.length-1 ){
            struct += "+ ',' ";
          }
        }
        if( i == keys.length-1){
          struct += "+'}'";
        }
        
      }
    //recusrive call
    console.log(struct);
    return eval(struct);
    //if empty object return '{}'
    //end case
    }else{
      return "{}";
    }
  }else if(typeof obj == "function"){
    return "";
  }else if(obj == undefined){
    return "";
  //check if obj is a number
  }else if(typeof obj == "number"){
    //end case
    return String(obj);
  //check if obj is a string
  }else if(typeof obj == "string"){
    //end case
    return "\""+obj+"\"";
  //check if obj is a boolean
  }else if(typeof obj == "boolean"){
    if(obj){
      //end case
      return "true";
    }else{
      //end case
      return "false";
    }
  }
};
