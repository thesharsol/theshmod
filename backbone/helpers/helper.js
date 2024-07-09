/* 
@name:helper
@author:BEBE EPEE IVAN SAMPI
@version: 1.0
@description:contains a formalization of some usual mechanisms that will be used a lot in the library
*/

/* 
@name:hasOwnProperty
@params:object Object,property String / int
@description: check if the given object has property
@return:boolean
*/
export function hasOwnProperty(object,property){
    return Object.prototype.hasOwnProperty.call(object,property);
}
/* 
@name:hasOwnProperties
@params:object Object,properties Array
@description: check if the given object has properties available in the array
@return:boolean
*/
export function hasOwnProperties(object,properties = []) {
    var ret =true;
    properties.forEach(property => {
        if (!hasOwnProperty(object,property)) {
            ret=false;
        }
    });
    return ret;
}
/* 
@name:hasIndex
@paramsarray Array,index Int/String
@description: check if the given array has an index
@return:boolean
*/
export function hasIndex(array,index){
    if (array[index]!=undefined) {
        return true;    
    }
    return false;
}
/* 
@name:isArray
@params:val 
@description: check if the given element is an array
*/
export function isArray(array=""){
    return Array.isArray(array);
}
/* 
@name:isNull
@paramsval 
@description: check if the given element is null
@return:boolean
*/
export function isNull(v){
    if (v == null) {
        return true;
    }
    return false;
}
/* 
@name:isEmpty
@paramsval 
@description: check if the given element is empty
@return:boolean
*/
export function isEmpty(v){
    if (v == "") {
        return true;
    }
    return false;
}
/* 
@name:isInt
@paramsval 
@description: check if the given element is an integer
@return:boolean
*/
export function isInt(val){
    if (typeof(parseInt(val))=="number") {
        return true;
    }
    return false;
}
/* 
@name:isString
@paramsval 
@description: check if the given element is a string
@return:boolean
*/
export function isString(val){
    if (typeof(val)=="string") {
        return true;
    }
    return false;
}
/* 
@name:isObject
@paramsval 
@description: check if the given element is an object
@return:boolean
*/
export function isObject(val){
    if (typeof(val)=="object") {
        return true;
    }
    return false;
}
/* 
@name:isBoolean
@paramsval 
@description: check if the given element is a boolean
@return:boolean
*/
export function isBoolean(val){
    if (typeof(val)=="boolean") {
        return true;
    }
    return false;
}
/* 
@name:spaceWords
@params:wordArray Array of Strings, numberOfSpaces int
@description:returns a concatenation of the strings in your array separated by the number of spaces you specified
*/
export function spaceWords(wordArray,numberOfSpaces){
    let wordWithSpaces = "";
    for (let i = 0; i < wordArray.length; i++) {
        if (isString(wordArray[i])) {
            if (hasIndex(wordArray,i+1)) {
                wordWithSpaces+=wordArray[i]+spaces(numberOfSpaces);
            }else{
                wordWithSpaces+=wordArray[i];
            }
        }
    }
    return wordWithSpaces;
}
/* 
@name:spaces
@params:numberOfSpaces int
@description:return a string that contains the number of spaces caracters asked
@return:string
*/
export function spaces(numberOfSpaces){
    var spaces = "";
    for (let n = 0; n < numberOfSpaces; n++) {
        spaces+=" ";
    }
    return spaces;
}
/* 
@name:indexOf
@params:object Object/array, needle 
@description:return the index of the needle or -1 when no result is available
@return:int
*/
export function indexOf(object,needle){
    return Array.prototype.indexOf.call(
        object,needle
      );
}
/* 
@name:inArray
@params:object Object/array, needle 
@description:allow to check if an element is in an array
@return:boolean
*/
export function inArray(array,needle){
    if (indexOf(array,needle)!=-1) {
        return true;
    }
    return false;
}

export function ObjectKeys(){
    
}