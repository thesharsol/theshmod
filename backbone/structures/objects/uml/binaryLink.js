/* 
@name:JsmLink
@version:1.0
@parent:Object
@author:BEBE EPEE Ivan Sampi
@description:implements the actor logic of the diagram of the same name in the uml method

*/

import { Link } from "../../default/link.js";

export class jsmBinaryLink extends Link{
    constructor(link = {}){
        super(link)
    }
    set connectedObject(objectId){
        if (Object.keys.length<2) {
            super.connectedObject = objectId;
        }
    }
}