/* 
@name:JsmActor
@version:1.0
@parent:Object
@author:BEBE EPEE Ivan Sampi
@description:implements the actor logic of the diagram of the same name in the uml method

*/

import { jsmObject } from "../../default/jsmObject.js";

export class JsmActor extends jsmObject{
    constructor(actor = {}){
        super(actor)
    }
}