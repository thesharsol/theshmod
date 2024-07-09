import { jsmNamedCircle } from "../../objects/freeShapes/nameCircle.js";
import { D_object } from "../default/d_object.js";


/* 
@name:JdNamedSquare
@parent:Drawer
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi

*/
export class JdNamedCircle extends D_object {
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
                this.selectedModel.addObject(new jsmNamedCircle(objectStructure));
                this.setObjectReferenceFromSelectedObject();
            }
            this.setup();
            this.configureEllipse();
            this.drawEllipseAndText();
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
        let baseWidth = textWidth > (this.configuration.ray.x * 2) ? textWidth : this.configuration.ray.x*2;
        // 
        var width = baseWidth;

        this.configure({
            width: width,
            height: (this.lineHeigth + (this.configuration.ray.y*2) - this.configuration.padding.bottom),
        });
    }

    drawEllipseAndText() {
        var data = {
            x: this.configuration.position.x + this.configuration.ray.x,
            y: this.configuration.position.y + this.configuration.ray.y,
            rx: this.configuration.ray.x,
            ry: this.configuration.ray.y,
            rot: this.configuration.rotation,
            as: this.configuration.angle.start,
            ae: this.configuration.angle.end,
        };
        this.drawAndSave("bgpt");
        this.drawAndSave("elps", data);
        this.drawAndSave("fas");
        this.drawAndSave("ft", {
            t: this.objectFromReference.name,
            x: this.configuration.position.x - this.drawer.textWidth(this.objectFromReference.name) / 2 + this.configuration.ray.x,
            y: this.configuration.position.y + (this.configuration.ray.y * 2) + this.configuration.padding.top
        }
        );
        this.drawAndSave("close");
    }
}