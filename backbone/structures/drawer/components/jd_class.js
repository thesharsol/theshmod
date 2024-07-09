/* 
@name:jdClass
@parent:Drawer
@version:1.0
@description: draw an uml class using the ginven informations
@author:BEBE EPEE Ivan Sampi
*/

import { isEmpty, isObject } from "../../../helpers/helper.js";
import { JsmClass } from "../../objects/uml/class.js";
import { D_object } from "../default/d_object.js";

export class JdClass extends D_object {
  constructor() {
    super();

  }
  init(objectStructure, redraw = false) {
    try {
      if (redraw) {
        //this.selectedModel.selectedObject = objectStructure;
        this.configuration.height = 0;

      } else {
        console.log(new JsmClass(objectStructure))
        this.selectedModel.addObject(new JsmClass(objectStructure));
        this.setObjectReferenceFromSelectedObject();
      }
      this.setup();
      this.defineWidth();
      this.header();
      this.body();
      this.footer();
      if (!redraw) {
        this.drawer.object = this;
      }
    } catch (error) {
      console.error(error);
    }
  }
  /*   redraw(){
      this.init(this.selectedModel.selectedObject,true);
    } */
  /* 
    @name:attributes
    @description:return the attributes of the selectedObject
    @return:object
     */
  get attributes() {
    return this.objectFromReference.attributes;
  }
  /* 
    @name:methods
    @description:return the amethodsttributes of the selectedObject
    @return:object
     */
  get methods() {
    return this.objectFromReference.methods;
  }
  /* 
    @name:defineWidth
    @description:define the width of the object to draw using the informations of the selected object
    */
  defineWidth() {
    this.configuration.width = this.drawer.textWidth(this.className);
    this.mapAndSetWidth("attribute", this.attributes);
    this.mapAndSetWidth("method", this.methods);
    this.configuration.width +=
      this.configuration.padding.left + this.configuration.padding.right;
  }
  /* 
    @name:mapAndSetWidth
    @params:string type,object tab
    @description:map the given object and define the width
    
    */
  mapAndSetWidth(type, tab) {
    for (const key in tab) {

      if (
        this.drawer.textWidth(this.format(type, tab[key])) >
        this.configuration.width
      ) {
        this.configuration.width = this.drawer.textWidth(
          this.format(type, tab[key])
        );
      }
    }
  }
  /*
    @name:format
    @params:string type,object element
    @description:format the name to display into he class form attributes and methods
    @return:string
      */
  format(type, element) {
    var ret = "";
    switch (type) {
      case "attribute":
        ret =
          this.visibility(element.visibility) +
          " " +
          element.type +
          " " +
          element.name;
        break;
      case "method":
        ret =
          this.visibility(element.visibility) +
          " " +
          element.type +
          " " +
          element.name +
          this.params(element);
        break;
      default:
        break;
    }
    return ret;
  }
  /* 
    @name:visibility
    @params:string vis
    @description: return the visibility using the given key
    @return:string
     */
  visibility(vis) {
    var visibility = {
      private: "- ",
      public: "+",
      protected: "#",
      package: "~",
    };
    return visibility[vis];
  }
  /* 
    @name:params
    @params:element
    @description: map the parameter array of an property an format the prototype
    @return:string
    */
  params(element) {
    var paramsText = "(";
    var counter = 0;
    element.params.forEach((param) => {
      paramsText += param.type + " " + param.name;
      if (!isEmpty(param.value)) {
        paramsText += " = " + param.value;
      }
      if (counter > element.params.length - 1) {
        paramsText += ",";
      }
      counter++;
    });
    paramsText += ")";

    return paramsText;
  }

  get className() {
    if (!isEmpty(this.objectFromReference.visibility)) {
      return (
        this.visibility(this.objectFromReference.visibility) +
        " " +
        this.objectFromReference.name
      );
    }
    return this.objectFromReference.name;
  }
  get textStartX() {
    return this.configuration.position.x + this.configuration.padding.left;
  }
  /* 
    @name:header
    @params:object objectStructure,object drawer
    @description:use the classDescription to draw the class header that will content the 
    */
  header() {
    this.DrawRectAndText(this.className);
  }
  body() {
    this.DrawRectAndText(this.attributes, this.lineHeigth, "attribute");
  }
  DrawRectAndText(texts, previousPartHeight = 0, type) {
    this.drawAndSave("bgpt");
    var number_of_attribtes = 0;
    var rect_data = {
      x: this.configuration.position.x,
      y: this.configuration.position.y + previousPartHeight,
      w: this.configuration.width,
      h: this.lineHeigth,
    };
    //
    //
    if (isObject(texts)) {
      number_of_attribtes = Object.keys(texts).length;
    } else {
      number_of_attribtes = 1;
    }
    //
    if (number_of_attribtes > 0) {
      rect_data.h = rect_data.h * number_of_attribtes;
      this.drawAndSave("rect", rect_data);
      this.drawAndSave("fas");
      if (isObject(texts)) {
        var i = 2;
        for (const key in texts) {

          this.drawAndSave("ft", {
            t: this.format(type, texts[key]),
            x: this.textStartX,
            y: this.configuration.position.y + previousPartHeight + ((this.lineHeigth) * (i - 1) - (this.lineHeigth / 2) + 5),
          });
          i++;
        }
      } else {
        this.drawAndSave("ft", {
          t: texts,
          x:
            this.configuration.position.x +
            (this.configuration.width - this.drawer.textWidth(this.className)) /
            2,
          y:
            this.configuration.position.y +
            this.configuration.fontSize +
            this.configuration.padding.top,
        });
      }
    } else {
      this.drawAndSave("rect", rect_data);
      this.drawAndSave("fas");
    }
    //
    //
    this.drawAndSave("close");
    this.configuration.height += rect_data.h;
  }
  footer() {
    var previousPartHeight = this.lineHeigth * 2;
    if (Object.keys(this.attributes).length > 0) {
      previousPartHeight =
        this.lineHeigth + this.lineHeigth * Object.keys(this.attributes).length;
    }

    this.DrawRectAndText(this.methods, previousPartHeight, "method");
  }
}
