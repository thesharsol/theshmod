import { jsmBinaryLink } from "../../objects/uml/binaryLink.js";
import { Jd_Binary_Link } from "./jd_binary_link.js";

/* 
@name:JdLink
@parent:D_object
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi

*/
export class Jd_Top_Binary_Link extends Jd_Binary_Link {
    constructor() {
        super();
    }


    drawLink() {
        let keys = Object.keys(this.objectFromReference.connectedObjects);
        //console.log(this.objectFromReference.connectedObjects);
        this.drawAndSave("bgpt");
        this.drawAndSave("mt", { 
            x: this.drawer.objects[keys[0]].configuration.position.x+this.drawer.objects[keys[0]].configuration.width/2, 
            y: this.drawer.objects[keys[0]].configuration.position.y 
        });
        this.drawAndSave("lt", { 
            x: this.drawer.objects[keys[0]].configuration.position.x+this.drawer.objects[keys[0]].configuration.width/2, 
            y: this.drawer.objects[keys[0]].configuration.position.y-20 
        });
        this.drawAndSave("lt", { 
            x: this.drawer.objects[keys[1]].configuration.position.x+this.drawer.objects[keys[1]].configuration.width/2, 
            y: this.drawer.objects[keys[1]].configuration.position.y-20 
        });
        this.drawAndSave("mt", { 
            x: this.drawer.objects[keys[1]].configuration.position.x+this.drawer.objects[keys[1]].configuration.width/2, 
            y: this.drawer.objects[keys[1]].configuration.position.y-20 
        });
        this.drawAndSave("lt", { 
            x: this.drawer.objects[keys[1]].configuration.position.x+this.drawer.objects[keys[1]].configuration.width/2, 
            y: this.drawer.objects[keys[1]].configuration.position.y 
        });
        this.drawAndSave("stk");
        this.drawAndSave("close");
    }
}