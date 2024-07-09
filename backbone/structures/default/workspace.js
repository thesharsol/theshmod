import { AfterBase } from "./afterbase.js";
import { Project } from "./project.js";

/* 
@name:Workspace
@version:1.0
@parent:AfterBase
@author:BEBE EPEE Ivan Sampi
@description:define the structure of a workspace

*/
export class Workspace extends AfterBase{
    /* 
    @name:constructor
    @params!workspace object
    @description:user the given workspace object to create a wokspace
    */
    constructor(workspace = {}){
        super(workspace);
    }
    /* 
    @name:projects
    @description:return all the projects ogf a workspace
    @return:object
    */
    get projects(){
        return this.elements;
    }
    /* 
    @name:projects
    @params:projects object
    @description:allow to replace the projects of the workspace with the contain of the object 
    */
    set projects(projects){
        this.elements = projects;
    }
    /* 
    @name:project
    @params:project
    @description:replace a project by the project given 
    */
    set project(project){
        this.element = project;
    }
    /* 
    @name:selectedProjectIndex
    @description:return the selected project index
    @return:int
    */
    get selectedProjectIndex(){
        return this.selectedElementIndex;
    }
    /* 
    @name:selectedProject
    @description:return the selected project object
    @return:object
    */
    get selectedProject(){
        return this.selectedElement;
    }
    /* 
    @name:selectedProject
    @params:index int
    @description:allow to set the selected project index 
    */
    set selectedProject(index){
        this.selectedElement = index;
    }
    /* 
    @name:addProject
    @params:project object
    @description:allow to add a new project to the workspace
    */
    addProject(project){
        this.project = new Project(project);
        this.selectedProject=this.projects.length-1;
    }

}
/* 
    initializing the jsm workspace
*/
export let jsmSpace = new Workspace({name:"jsm",type:"default"});