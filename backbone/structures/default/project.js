import { AfterBase } from "./afterbase.js";
import { Model } from "./model.js";

/* 
@name:Project
@version:1.0
@parent:AfterBase
@author:BEBE EPEE Ivan Sampi
@description:define the structure of project

*/
export class Project extends AfterBase{

    /* 
    @name:construct
    @paramsproject object
    @description: use the informations of the given project object to build a project
    */
    constructor(project = {}){
        super(project);

    }
    /* 
    @name:model
    @description:getter that return the list off models
    @return: object
    */

    get models(){
        return this.elements;
    }
    /* 
    @name:models
    @params:models object
    @description:allow to set models
    */
    set models(models){
        this.elements = models;
    }
    /* 
    @name:model
    @params:model object
    @description:allow to set model
    */
    set model(model){
        this.element = model
    }
    /* 
    @name:selectedModelIndex
    @descripton: return an index from an existing model
    @return:int
    */
    get selectedModelIndex(){
        return this.selectedElementIndex;
    }
    /* 
    @name:selectedModel
    @description:return the selected model
    @return:object
    */
    get selectedModel(){
        return this.selectedElement;
    }
    /* 
    @name:selectedModel
    @description:allow to set the selected model index 

    */
    set selectedModel(index){
        this.selectedElement = index;
    }
    /* 
    @name:addModel
    @description:allow to create a new model and set it as the selected model
    */
    addModel(model){
        this.model = new Model(model);
        this.selectedModel = this.models.length-1;
    }
}