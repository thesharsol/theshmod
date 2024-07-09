import { hasOwnProperties, hasOwnProperty, isArray, isObject, spaceWords } from "../../helpers/helper.js";
import { Base } from "./base.js";

/* 
@name:Property
@version:1.0
@parent:Base
@author:BEBE EPEE Ivan Sampi
@description:define the structure of property

*/
export class Property extends Base{
    #value;
    #visibility="";
    #params = [];
    constructor(property){
        super(property);
        if (hasOwnProperty(property,"value")) {
            this.value = property.value
            if (hasOwnProperty(property,"visibility")) {
                this.visibility = property.visibility
                
            }
            if (hasOwnProperty(property,"params")) {
                if (isObject(property.params) && !isArray(property.params)) {
                    for (const key in property.params) {
                       if (hasOwnProperties(property.params[key],["name","type"])) {
                        this.params=property.params[key];
                       }
                    }
                }
                this.visibility = property.visibility
                
            }
        }else{
            throw(spaceWords([lang.errors.missProperty,"value"],1));
        } 
    }
    /* 
    @name:value
    @description:return the value of the property
    @return:string / object
    */
    get value(){
        return this.#value;
    }
    /* 
    @name:value
    @params:value any
    @description:allow to define the value of the property
    */
    set value(value){
        this.#value = value; 
    }
    /* 
    @name:visibility:
    @description:return the visibility of the property
    @return: string
    */
    get visibility(){
        return this.#visibility;
    }
    /* 
    @name:visibility
    @params:visibility string
    @description:allow to set the visibility of the property
    
    */
    set visibility(visibility){
        this.#visibility = visibility; 
    }
    /* 
    @name:params
    @description: return the parameters of the property
    @return:array
    */
    get params(){
        return this.#params;
    }
    /* 
    @name:params
    @params:params any
    @description:allow to add a parameter to a property
    */
    set params(params){
        this.#params.push(params); 
    }
}