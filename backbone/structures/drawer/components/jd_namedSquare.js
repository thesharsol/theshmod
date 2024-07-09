import { jsmNamedSquare } from "../../objects/freeShapes/namedSquare.js";
import { D_object } from "../default/d_object.js";


/* 
@name:JdNamedSquare
@parent:Drawer
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi

*/
export class JdNamedSquare extends D_object {
    constructor() {
        super();
    }
    /* 
    
    */
    init(objectStructure, redraw = false) {
        this.configure({ padding: { left: 40, right: 40, top: 20, bottom: 20 } });

        try {
            if (!redraw) {
                /*               this.selectedModel.selectedObject = objectStructure;
                          } else { */
                this.selectedModel.addObject(new jsmNamedSquare(objectStructure));
                this.setObjectReferenceFromSelectedObject();
            }
            this.setup();
            this.configureEllipse();
            this.drawRectAndText();
            if (!redraw) {
                this.drawer.object = this;
            }

        } catch (error) {
            console.error(error);
        }

    }
    /*     redraw() {
            this.init(this.selectedModel.selectedObject, true);
        } */
    configureEllipse() {
        let textWidth = this.drawer.textWidth(this.objectFromReference.name);
        let baseWidth = textWidth > (this.configuration.ray.x * 2) ? textWidth : this.configuration.ray.x * 2;
        // 
        var width = baseWidth;

        this.configure({
            width: width,
            height: (this.lineHeigth + (this.configuration.ray.y * 2) - this.configuration.padding.bottom - this.configuration.padding.top),
        });
    }

    drawRectAndText() {
        var data = {
            x: this.configuration.position.x + (this.configuration.width/2) - this.configuration.ray.x,
            y: this.configuration.position.y,
            w: this.configuration.ray.x * 2,
            h: this.configuration.ray.y * 2,
        };
        this.drawAndSave("bgpt");
        this.drawAndSave("rect", data);
        this.drawAndSave("fas");
        this.drawAndSave("ft", {
            t: this.objectFromReference.name,
            x: this.configuration.position.x - this.drawer.textWidth(this.objectFromReference.name) / 2 + (this.configuration.width/2),
            y: this.configuration.position.y + (this.configuration.ray.y * 2) + this.configuration.padding.top
        }
        );
        this.drawAndSave("close");
    }
}