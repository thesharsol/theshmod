/* 
@name:jsmObject
@parent:Base
@author:BEBE EPEE Ivan Sampi
@description: the define a structure of an jsmobject
@version:1.0

*/

import { hasOwnProperty, isObject,spaceWords } from "../../helpers/helper.js";
import { lang } from "../../language/en.js";
import { Base } from "./base.js";
import { Property } from "./property.js";

export class jsmObject extends Base{
    #properties = {};

    constructor(object = {}){
        super(object);

    }
    get properties(){
        return this.#properties;
    }
    /* 
    @name:properties
    @paramsnone
    @description:set all the object properties
    */
    set properties(properties){
        this.#properties = properties;
    }
    /* 
    @name:property
    @paramsobject property
    @description: define a new property from the #properties object
    */
    set property(property){
        this.addProperty(property)
    }
    /* 
    @name:addProperty
    @paramsadd an property using the propertyObject in the given object or in the #properties object if there is no object given
     */
    addProperty(propertyObject,propertiesList = this.properties){
        try {
            this.setProperty(propertyObject,propertiesList);
        } catch (error) {
            console.error("error")
        }
    }
    /* 
    @name:setProperty
    @params:propertiesList,propertyObject
    @decription:add a new property Object to the given property */
    setProperty(propertyObject,propertiesList){
        if (isObject(propertiesList)) {
            try {
                propertiesList[propertyObject.name] = new Property(propertyObject);
            } catch (error) {
                console.error(error);            
            } 
        }else{
            throw(spaceWords([lang.errors.typeError,"object"],1))
        }  
    }
    /* 
    @name:getProperty
    @params:propertyName
    @description:return a property using the given name if it exist and an empty object else
    @return:object
    */
    getProperty(propertyName,object = this.properties){
        if (hasOwnProperty(object,propertyName)) {
            return object[propertyName];
        }
        return undefined;
    }
    getPropertyValue(propertyName,object = this.properties){
        if (this.getProperty(propertyName,object)!=undefined) {
            return this.getProperty(propertyName,object).value;
        }
        return undefined;
    }
    /* 
    @name:hasProperty
    @params:propertyName
    @desccription:check if a property exist
    @return:bool
    */
    hasProperty(property,object = this.properties){
        return hasOwnProperty(object,property)
    }
}