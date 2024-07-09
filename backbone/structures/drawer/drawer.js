/* 
@name:Drawer
@version:1.0
@description:this class will allow graphical representation of all data structures (objectss) created 
@author:BEBE EPEE Ivan Sampi

*/

import { inArray, isBoolean, isInt, isNull } from "../../helpers/helper.js";
import { jsmSpace } from "../default/workspace.js";

class Drawer {
  #editable = false;
  #canvas = null;
  #ctx = null;
  #selectedObjectIndex = null;
  #objects = [];
  #distances = { x: null, y: null };
  #linkBuilder = [];
  #linkBuilderState = false;
  #binaryLinkPossible = null;
  #linkedObjectAdded = null;

  constructor() {
    try {
      this.canvas = document.getElementById("drawingSpace");
      this.ctx = this.canvas.getContext("2d");
      this.#binaryLinkPossible = new Event("binaryLinkPossible");
      this.#linkedObjectAdded = new Event("linkedObjectAdded");
    } catch (error) {
      console.error(error);
    }
    this.init();
  }
  /* 
  @name:linkbuilder
  @description:return the array of the linkBuilder
  @return:object
  */
  get linkBuilder() {
    return this.#linkBuilder;
  }
  /* 
  @name:linkBuilder
  @params:linkBuilder array
  @description:allow to edit the linkBuilder
  */
  set linkBuilder(linkBuilder) {
    this.#linkBuilder = linkBuilder;
  }
  /*
  @name:resetLinkBuilder
  @description:allow you to empty the linkBuilder
  */
  resetLinkBuilder() {
    this.linkBuilder = [];
  }
  /* 
  @name:addObjectToLinkBuilder
  @description:add the index of the selected object in the link builder
  */
  addObjectToLinkBuilder(index) {

    this.linkBuilder.push(index);
    if (this.linkBuilder.length == 2) {
      this.canvas.dispatchEvent(this.#binaryLinkPossible);
    } else {
      if (this.linkBuilder.length <= 2) {
        this.canvas.dispatchEvent(this.#linkedObjectAdded);
      }
    }
    console.log(this.linkBuilder);
  }
  get distances() {
    return this.#distances;
  }
  set distances(distance) {
    this.#distances = distance;
  }
  set distancesX(distance) {
    this.#distances.x = distance;
  }
  set distancesY(distance) {
    this.#distances.y = distance;
  }
  get distancesX() {
    return this.#distances.x;
  }
  get distancesY() {
    return this.#distances.y;
  }
  get linkBuilderState() {
    return this.#linkBuilderState;
  }
  set linkBuilderState(linkBuilderState) {
    if (isBoolean(linkBuilderState)) {
      this.#linkBuilderState = linkBuilderState;
    }
  }
  enableLinkBuilder() {
    this.linkBuilderState = true;
  }
  disableLinkBuilder() {
    this.linkBuilderState = false;
  }
  isLinkBuilderEnabled() {
    return this.linkBuilderState;
  }
  /* 
  @name:init
  @description:initialize all the events that will allow to interact with the canvas 
  */
  init() {
    var that = this;
    // 
    this.canvas.addEventListener("mousemove", function (e) {
      if (that.identify_element(e).state) {
        //alert()
        that.canvas.style.cursor = "move";
        if (!isNull(that.selectedObject)) {
          if (typeof (jsmSpace) != undefined) {
            //alert()
            jsmSpace.selectedProject.selectedModel.selectedObject = that.selectedObject.objectReference;
          } else {
            jsmSpace.selectedProject.selectedModel.selectedObject = null;
          }
          that.move(e);
        }
      } else {
        that.canvas.style.cursor = "default";
      }
    });
    this.canvas.addEventListener("click", function (e) {
      var identify = that.identify_element(e);
      if (identify.state && that.linkBuilderState && !inArray(that.linkBuilder, identify.index)) {
        that.addObjectToLinkBuilder(identify.index);
      }
    })
    // 
    this.canvas.addEventListener("mouseup", function (e) {
      that.selectedObject = null;
      that.distancesX = null;
      that.distancesY = null;
    });
    // 
    this.canvas.addEventListener("mousedown", function (e) {
      var identify = that.identify_element(e);
      if (identify.state) {
        that.selectedObject = Array.prototype.indexOf.call(
          that.objects,
          identify.selected
        );

      } else {
        that.selectedObject = null;
      }
    });
  }
  /* 
  @name:identify_element
  @params:e event
  @description: identifies an element according to the position of the cursor in the canvas and return an
  @return:object
  
  */
  identify_element(e) {
    var that = this;
    var ret = {
      state: false,
      selected: null,
      index: null,
    };
    var x = e.offsetX;
    var y = e.offsetY;

    this.objects.forEach((object) => {
      if (
        x >= object.configuration.position.x &&
        y >= object.configuration.position.y &&
        x <= object.configuration.position.x + object.configuration.width &&
        y <= object.configuration.position.y + object.configuration.height
      ) {
        ret.selected = object;
        ret.state = true;
        ret.index = Array.prototype.indexOf.call(
          that.objects,
          object)
      }
    });
    return ret;
  }
  move(e) {
    if (this.distancesX == null) {
      this.distancesX = e.offsetX - this.selectedObject.configuration.position.x;
      this.distancesY = e.offsetY - this.selectedObject.configuration.position.y;
    }

    //console.log(this.distances);
    this.redraw(e);
    //console.log(this.selectedObject.configuration.position)
  }
  redraw(e) {
    var that = this;

    this.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);

    this.selectedObject.configuration.position.x = e.offsetX - this.distancesX;
    this.selectedObject.configuration.position.y = e.offsetY - this.distancesY;
    this.objects.forEach(object => {
      //console.log(object.configuration);
      if (object != that.selectedObject) {
        object.redraw();
      } else {
        that.selectedObject.redraw();

      }
    });


  }
  /*
   */
  get selectedObject() {
    if (
      !isNull(this.#selectedObjectIndex) &&
      this.objects[this.#selectedObjectIndex] != undefined
    ) {
      return this.objects[this.#selectedObjectIndex];
    }
    return null;
  }
  /*
   */
  set selectedObject(index) {
    if (isInt(index)) {
      this.#selectedObjectIndex = index;
    } else {
      throw "error";
    }
  }
  /*
   */
  get editable() {
    return this.#editable;
  }
  /* 
    
    */
  set editable(editable) {
    this.#editable = editable;
  }
  /* 
    @name:canvas
    @description:return the canvas value
    @return:object
    */
  get canvas() {
    return this.#canvas;
  }

  /* 
    @name:canvas
    @params:canvas object
    @description:set the canvas value
    */
  set canvas(canvas) {
    if (canvas != null) {
      this.#canvas = canvas;
    } else {
      throw "drawing space is null";
    }
  }

  /* 
    @name:ctx
    @description:return the canvas context
    @return:object
    */
  get ctx() {
    return this.#ctx;
  }
  /* 
    @name:context
    @params:context object
    @description:set the canvas context
    */
  set ctx(ctx) {
    this.#ctx = ctx;
  }
  /* 
    @name:objects
    @description:return the objects
    @return:object
    */
  get objects() {
    return this.#objects;
  }
  /* 
    @name:objects
    @params:objects object
    @description:set the objects
    */
  set objects(objects) {
    this.#objects = objects;
  }
  /* 
    @name:objects
    @params:objects object
    @description:set the objects
    */
  set object(object) {
    this.#objects.push(object);
  }
  /* 
    @name:textWith
    @params:text string
    @descripton:return the with of a text
    @return:int
    */
  textWidth(text) {
    return this.ctx.measureText(text).width;
  }
  /* 

     */
  drawObjects() {
    this.objects.forEach((object) => {
      if (loader != undefined) {
        this.load(loader.paths.backbone + "structures/drawer/" + object.name);
      }
    });
  }
  /*
    @name:drawAndSave
    @params:a; represent the action to call, p ; represent the parameters of the action
    output; represent the objet were will be save the actions done
    @description: allows to perform all basic actions on the canvas context 
      */
  drawAndSave(a /* action alias */, p /* parameters */, output = null) {
    switch (a) {
      case "mt":
        this.ctx.moveTo(p.x, p.y);
        break;
      case "fr":
        this.ctx.fillRect(p.x, p.y, p.w, p.h);
        break;
      case "sr":
        this.ctx.strokeRect(p.x, p.y, p.w, p.h);
        break;
      case "rect":
        this.ctx.rect(p.x, p.y, p.w, p.h);
        break;
      case "lt":
        this.ctx.lineTo(p.x, p.y);
        break;
      case "ft":
        // change fillstyle to make the text be displayed*
        this.ctx.save();
        this.ctx.fillStyle = "black";
        if (Object.hasOwnProperty.call(p, "color")) {
          // alert()
          this.ctx.fillStyle = p.color;
        }

        this.ctx.fillText(p.t, p.x, p.y);
        this.ctx.restore();
        break;
      case "elps":
        this.ctx.ellipse(p.x, p.y, p.rx, p.ry, p.rot, p.as, p.ae);

        break;

      case "cfs":
        this.ctx.font = p.fs;

        break;
      case "cfst":
        this.ctx.fillStyle = p.color;
        break;
      case "fst":
        this.ctx.fillStyle = p.color;
        break;
      case "sst":
        this.ctx.strokeStyle = p.color;
      case "lw":
        this.ctx.lineWidth = p.w;
        break;
      case "bct":
        this.ctx.bezierCurveTo(p.x1, p.y1, p.x2, p.y2, p.f1, p.f2);
        break;
      case "bgpt":
        this.ctx.beginPath();
        break;
      case "close":
        this.ctx.closePath();
        break;
      case "fas":
        this.ctx.fill();
        this.ctx.stroke();
        break;
      case "fl":
        this.ctx.fill();
        break;
      case "stk":
        this.ctx.stroke();
        break;
      default:
        break;
    }
    if (output != null) {
      output.push({ name: a, param: p });
    }
  }
}

export let drawer = new Drawer();
