import { hasOwnProperty } from "../../../helpers/helper.js";
import { jsmObject } from "../../default/jsmObject.js";

/* 
@name:jsmClass
@version:1.0
@parent:Object
@author:BEBE EPEE Ivan Sampi
@description:implements the class logic of the diagram of the same name in the uml method

*/
export class JsmClass extends jsmObject{
    constructor(JsmClass = {}){
        super(JsmClass);
        this.property = {type:"",name:"visibility",value:""};
        this.property = {type:"",name:"attributes",value:{}};
        this.property = {type:"",name:"methods",value:{}};
        if (hasOwnProperty(JsmClass,"attributes")) {
            this.attributes = JsmClass.attributes;
        }
        if (hasOwnProperty(JsmClass,"methods")) {
            this.methods = JsmClass.methods;
        }
    }
    get visibility(){
        return this.properties.visibility.value;
    }
    set visibility(visibility){
        this.properties.visibility.value=visibility;
    }
    /* 
    @name:attributes
    @description: return the list of all attributes
    @return:object
    */
    get attributes(){
        return this.properties.attributes.value;
    }
    /* 
    @name:methods
    @description:return the list of class methods
    @return:object
     */
    get methods(){
        return this.properties.methods.value;
    }
    /* 
    @name:getAttribute
    @params:attributeName
    @description : return an attribute using the given attrribute name
    */ 
    getAttribute(attributeName){
        return this.getProperty(attributeName,this.getProperty("attributes"));
   
    }
    /*
    @name:getMethod
    @params:methodName
    @description : return a method using the given method name
    */
    getMethod(methodName){
        return this.getProperty(methodName,this.getProperty("methods"));

    }
    /* 
    @name:attribute
    @params: attribute
    @description: set an attribute
    */
    set attribute(attribute){
        this.addProperty(attribute,this.attributes)
    }
        /* 
    @name:attributes
    @params: attribute
    @description: set an attribute
    */
    set attributes(attributes){
        for (const key in attributes) {
            this.attribute = attributes[key];
        }
    }

    
    /* 
    @name:method
    @params: method
    @description: set an attribute
    */
    set method(method){
        this.addProperty(method,this.methods)
    }
        /* 
    @name:method
    @params: method
    @description: set an attribute
    */
    set methods(methods){
        for (const key in methods) {
            this.method = methods[key];
        }
    }

}