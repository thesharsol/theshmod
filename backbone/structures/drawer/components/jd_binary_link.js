import { jsmBinaryLink } from "../../objects/uml/binaryLink.js";
import { D_object } from "../default/d_object.js";

/* 
@name:JdLink
@parent:D_object
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi

*/
export class Jd_Binary_Link extends D_object {
    constructor() {
        super();
    }
    /* 
 
*/
    init(objectStructure, redraw = false) {

        try {
            if (!redraw) {
                /*               this.selectedModel.selectedObject = objectStructure;
                          } else { */
                this.selectedModel.addObject(new jsmBinaryLink(objectStructure));
                this.setObjectReferenceFromSelectedObject();
            }
            this.setup();
            this.drawLink();
            if (!redraw) {
                this.drawer.object = this;
            }

        } catch (error) {
            console.error(error);
        }

    }

    drawLink() {
        let keys = Object.keys(this.objectFromReference.connectedObjects);
        //console.log(this.objectFromReference.connectedObjects);
        this.drawAndSave("bgpt");
        this.drawAndSave("mt", { 
            x: this.drawer.objects[keys[0]].configuration.position.x+this.drawer.objects[keys[0]].configuration.width+5, 
            y: this.drawer.objects[keys[0]].configuration.position.y+this.drawer.objects[keys[0]].configuration.height/2 
        });
        this.drawAndSave("lt", { 
            x: this.drawer.objects[keys[1]].configuration.position.x-5, 
            y: this.drawer.objects[keys[1]].configuration.position.y+this.drawer.objects[keys[0]].configuration.height/2 
        });
        this.drawAndSave("fas");
        this.drawAndSave("close");
    }
}