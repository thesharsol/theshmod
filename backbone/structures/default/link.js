/* 
@name:link
@version:1.0
@parent:JsmObject
@author:BEBE EPEE Ivan Sampi
@description:define the basic structure of a link
 */

import { hasOwnProperties, hasOwnProperty, isObject, spaceWords } from "../../helpers/helper.js";
import { lang } from "../../language/en.js";
import { jsmObject } from "./jsmObject.js";

export class Link extends jsmObject {
    constructor(link = {}) {
        super(link);
        this.property = { type: "", name: "connectedObjects", value: {} }
        if (isObject(link) && hasOwnProperties(link, ["connectedObjects"])/*  && link.objectsToConnect.length > 1 */) {
            link.connectedObjects.forEach(obj => {
                if (hasOwnProperty(obj, "objectId")) {
                    this.connectedObject = obj.objectId;
                    if (this.hasProperty(obj, "cardinality")) {
                        this.cardinality(obj);
                    }
                }

            });
        }
        console.log(this.connectedObjects)
    }
    /* 
    @name:connectedObjects
    @description: return all the objects connected by the link
    @return:object
    */
    get connectedObjects() {
        return this.properties.connectedObjects.value;
    }
    /* 
    @name:connectedObjects
    @params: objectsToConnectInfo
    @description: set the objects that are connected by the link 
    */
    set connectedObjects(objectsIds) {
        if (isArray(objectsIds)) {
            objectsIds.forEach(objectId => {
                this.connectedObject = objectId;
            });
        } else {
            throw (spaceWords([lang.errors.typeError, lang.labels.array], 1));
        }
    }
    /* 
    @name:getConnectedObject
    @params:key
    @description: returns the link object identified by the key passed in
     parameter or an empty object if no match is found   */
    getConnectedObject(key = "") {
        if (this.hasProperty(key, this.connectedObjects)) {
            return this.connectedObjects[key];
        } else {
            return {};
        }
    }

    /* 
    @name:connectedObject
    @params:objetToVonnectInfo
    @description: define the objects connected by the link
     */
    set connectedObject(objectId) {
        this.connectedObjects[objectId] = {};
    }
    /* 
    @name:cardinalities
    @description: returns an object containing the connected objects and their cardinalities 
    @return:object
     */
    get cardinalities() {
        var cardinalities = {}
        for (const key in this.connectedObjects) {
            if (this.hasProperty("cardinality", this.getConnectedObject(key))) {
                cardinalities[key] = this.getCardinality(key);
            }
        }
        return cardinalities;
    }
    /* 
    @name:cardinalities
    @params:cardinalities
    @description: defines the cardinalities of the objects connected by the link
    @return:object
     */
    set cardinalities(cardinalities = []) {

        for (const key in this.connectedObjects) {
            if (this.hasProperty("cardinality", this.getConnectedObject(key))) {
                cardinalities[key] = this.getCardinality(key);
            }
        }
    }
    /* 
    @name:getCardinality
    @description: returns the cardinalty of the asked object of the link
    @return:object
     */
    getCardinality(key) {
        if (this.hasProperty(key, this.connectedObjects)) {
            return this.getConnectedObject(key).cardinality;
        }
        return null;
    }

    /* 
    @name:cardinality
    @params:cardinality
    @decription: set the cardinality of the object correspond with the given key
    */
    set cardinality(card) {
        this.getConnectedObject(card.id).cardinality = card.cardinality;
    }
}