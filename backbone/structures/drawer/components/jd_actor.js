import { JsmActor } from "../../objects/uml/actor.js";
import { D_object } from "../default/d_object.js";

/* 
@name:JdEllipse
@parent:Drawer
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi

*/
export class JdActor extends D_object {
    constructor() {
        super();
    }
    /* 
    @name init 
    */
    init(objectStructure, redraw = false) {
        try {
            if (!redraw) {
/*                 this.selectedModel.selectedObject = objectStructure;
            } else { */
                this.selectedModel.addObject(new JsmActor(objectStructure));
                this.setObjectReferenceFromSelectedObject();
            }
            this.setup();
            this.configureActor();
            this.drawActorAndText();
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

    configureActor() {
        var width = this.drawer.textWidth(this.className) + this.configuration.padding.left + this.configuration.padding.right;
        this.configure({
            width: width,
            height: this.lineHeigth + 100
        });
    }
    drawActorAndText() {
        var data = {
            x: this.configuration.position.x,
            y: this.configuration.position.y,
            rx: 10,
            ry: 10,
            rot: this.configuration.rotation,
            as: this.configuration.angle.start,
            ae: this.configuration.angle.end,
        };
        this.drawAndSave("bgpt");
        this.drawAndSave("elps", data);
        data.y += 10;
        this.drawAndSave("mt", data);
        data.y += 50;
        this.drawAndSave("lt", data);
        this.drawAndSave("mt", data);
        data.x -= 10;
        data.y += 20;
        this.drawAndSave("lt", data);
        data.x += 10;
        data.y -= 20;
        this.drawAndSave("mt", data);
        data.x += 10;
        data.y += 20;
        this.drawAndSave("lt", data);

        data.x-=20;
        data.y-=45;
        this.drawAndSave("mt", data);
        data.x+=20;
        this.drawAndSave("lt", data);
        
        this.drawAndSave("fas");
        this.drawAndSave("ft", {
            t: this.objectFromReference.name,
            x: this.configuration.position.x - this.drawer.textWidth(this.objectFromReference.name) / 2,
            y: this.configuration.position.y + 100
        }
        );
        this.drawAndSave("close");
    }
}