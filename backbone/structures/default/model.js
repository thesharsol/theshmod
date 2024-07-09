import { AfterBase } from "./afterbase.js";

/* 
@name:link
@version:1.0
@parent:AfterBase
@author:BEBE EPEE Ivan Sampi
@description:define the basic elements of a link
 */
export class Model extends AfterBase{

    /* 
    @name:constructor
    @params:model object
    @description:use the given object to fill the properties of the model
    */
    constructor(model = {}){
        super(model);
    }
    /* 
    @name:objects
    @description:return the list of the model objects
    @return:object
    */
    get objects(){
        return this.elements;
    }
    /* 
    @name:objects
    @params:objects object
    @description:add the model with the given objects
    */
    set objects(objects){
        this.elements = objects;
    }
    /* 
    @name:object
    @params:object
    @description:add the givent object to the model objects list
    */
    set object(object){
        this.element = object
    }
    /*
    @name:selectedObjectIndex
    @description:return the selected object index
    @return:int
    */
    get selectedObjectIndex(){
        return this.selectedElementIndex;
    }
    /* 
    @name:selectedObject
    @description:return the selected object 
    @return:object
    */
    get selectedObject(){
        return this.selectedElement;
    }
    set selectedObject(index){
        this.selectedElement = index;
    }
    /* 
    @name:addObject
    @params:object object
    @description:allow to add object from the model
    */
    addObject(object){
        this.object = object;
        this.selectedObject=this.objects.length-1;
    }
}