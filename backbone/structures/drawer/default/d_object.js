/* 
@name:D_object
@version:1.0
@description:this define the basics features of an drawer object
@author:BEBE EPEE Ivan Sampi

*/

import { hasOwnProperty, isInt, isObject, spaceWords } from "../../../helpers/helper.js";
import { lang } from "../../../language/en.js";
import { jsmSpace } from "../../default/workspace.js";
import { drawer } from "../drawer.js";

export class D_object {
  #objectReference = null;
  #configuration = {
    padding: { left: 20, right: 20, top: 5, bottom: 5 },
    lineHeight: 0,
    width: 0,
    height: 0,
    rotation: 0,
    ray: { x: 0, y: 0 },
    angle: { start: 0, end: 2 * Math.PI },
    position: { x: 0, y: 0 },
    fontSize: 14,
    fontFamily: "verdana",
    textColor: "black",
    borderColor: "silver",
    fillColor: "#ffff99",
    borderWidth: 1,
  };
  #actions = [];
  constructor() {
    if (this.constructor === D_object) {
      throw (spaceWords(["D_object", lang.errors.abstractError], 1));
    }
  }
  get actions() {
    return this.#actions;
  }

  set actions(action) {
    this.#actions[action.name] = action.options;
  }
  get configuration() {
    return this.#configuration;
  }
  set configuration(configuration) {
    this.#configuration = configuration;
  }
  get objectReference() {
    return this.#objectReference;
  }
  set objectReference(objectReference) {
    if (isInt(objectReference)) {
      this.#objectReference = objectReference;
    } else {
      throw "";
    }
  }
  setObjectReferenceFromSelectedObject(){
    this.objectReference= this.selectedModel.selectedObjectIndex;
  }
  get lineHeigth() {
    return (
      this.configuration.fontSize +
      this.configuration.padding.top +
      this.configuration.padding.bottom
    );
  }
  get selectedModel() {
    // console.log(jsmSpace.selectedProject.selectedModel)
    return jsmSpace.selectedProject.selectedModel;
  }
  get selectedObject() {
    return this.selectedModel.selectedObject;
  }
  get objectFromReference() {
    return this.selectedModel.objects[this.objectReference];
  }

  get drawer() {
    return drawer;
  }
  get properties() {
    return this.selectedObject.properties;

  }
  /* 
  
  */
  configure(configuration) {
    if (isObject(configuration)) {
      for (const key in configuration) {
        if (hasOwnProperty(this.configuration, key) && typeof (configuration[key] == this.configuration[key])) {
          this.configuration[key] = configuration[key];
        }
      }
    }
  }
  setup() {
    this.drawer.drawAndSave("cfs", {
      fs: this.configuration.fontSize + "px " + this.configuration.fontFamily,
    });
    this.drawer.drawAndSave("cfst", { color: this.configuration.fillColor });
    this.drawer.drawAndSave("lw", { w: this.configuration.borderWidth });
    this.drawer.drawAndSave("sst", { color: this.configuration.borderColor });
  }
  redraw() {
    //console.log(this.objectFromReference);
    this.init(this.objectFromReference, true);
  }
  drawAndSave(a /* action alias */, p /* parameters */) {
    if (!this.selectedObject.hasOwnProperty("draw")) {
      this.selectedObject.property = { type: "", name: "draw", value: [] };
    }

    this.drawer.drawAndSave(a, p);
  }
}
