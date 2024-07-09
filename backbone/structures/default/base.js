import { hasOwnProperties, spaceWords } from "../../helpers/helper.js";
import { lang } from "../../language/en.js";

/* 
@name:Base
@version:1.0
@description:is an abstact class that define the basic behaviour of an jsm element

*/
export class Base{
    #name;
    #type;
    /* 
    @name:constructor
    @params:base object
    @description:user the base object informations to set the base properties values 
    */
    constructor(base = {}){
        if (this.constructor === Base) {
            throw(spaceWords(["Base",lang.errors.abstractError],1))
        }else{
            if (typeof(base)=="object") {
                if (hasOwnProperties(base,["name","type"])) {
                    this.name = base.name;
                    this.type = base.type;
                }else{
                    throw(spaceWords([lang.errors.missProperty,"name or type"],1));
                }
            }else{
                throw(spaceWords([lang.errors.typeError,lang.labels.object],1));
            }
        }

    }
    /* 
    @name:name
    @description:return the name of the element
    @return:String
    */
    get name(){
        return this.#name;
    }
    /* 
    @name:name
    @paramsname string
    @description:set the name of the element 
    */
    set name(name){
        this.#name = name; 
    }
    /* 
    @name:type
    @description:return the type of the element
    @return:string
    */
    get type(){
        return this.#type;
    }
    /* 
    @name:type
    @params:type string
    @description:define the type of the element 
    */
    set type(type){
        this.#type = type; 
    }
}