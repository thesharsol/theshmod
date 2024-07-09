
/* 
@project:Jsm
@name:Loader
@description: this class will allow you to include js file in your html file
@author:BEBE EPEE Ivan Sampi
@version:1.0

*/
export class Loader{
    #paths = {
        backbone:"backbone/",
    }
    #loadedElements = {};
    #filesToload = {
        helpers:{
            root:["helper"]
        },
        structures:{
            default:["_base","property","_afterbase","workspace","project","model","object","link",],
            drawer:{
                root:["drawer"],
                default:["d_object"]
            }
        },
        
    }
    /*  */
    get loadedElements(){
    }
    /* 

     */
    constructor(){

    }
    /* 
    @name:paths
    @description: return the paths of the backbone 
    @return:String
    */
    get paths(){
        return this.#paths;
    }
    /* 
    @name:fileToLoad
    @description: return an object tha contain all the files to load
    @return:object
    */
    get filesToLoad(){
        return this.#filesToload;
    }
    /* 
    @name:loadEnv
    @description:load the environment 
    */
    loadEnv(){
        // load the language file
        this.loadLang()
        // map the fileToLoad object to build links and load 
        this.map_links(this.filesToLoad,"");   
    }
    /* 
    @name:map_links
    @params:tab object,link string
    @description:map the tab to build links  and load ressources
    */
    map_links(tab,link){
        for (const key in tab) {
            if(Array.isArray(tab[key])){
                tab[key].forEach(file => {
                    if(key!="root"){
                        var fileLink = link+key+"/"+file;
                    }else{
                        var fileLink = link+file;
                    }
                    this.load(this.url(fileLink));
                });
            }else{
                this.map_links(tab[key],link+key+"/");
            }
        }
    }
    /*
    @name:loadLang
    @description:Load language file(s) accordind with the configuration file
    */
    loadLang(){
        if (config.language=="fr") {
            this.load(this.url("language/fr"));
        }else{
            this.load(this.url("language/en"));
        }
    }
    /* 
    @name:url
    @params:link String
    @description:return a link of and ressource
    @return:String
    */
    url(link){
        return this.#paths.backbone+link;
    }
    /* 
    @name:load
    @params:path String
    @description:add the path append the body 
    */

    load(path){
        var body = document.querySelector("head");
        var script = document.createElement("script");
        script.setAttribute("src",path+".js"); 
        body.append(script);
    }
}
/* initializing a loader */
var loader = new Loader();
loader.loadEnv();