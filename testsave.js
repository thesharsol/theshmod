import { jsmSpace } from "./backbone/structures/default/workspace";
document.addEventListener("readystatechange", function () {
  if (document.readyState == "complete") {
    jsmSpace.addProject({ name: "test", type: "rr" });
    jsmSpace.selectedProject.addModel({ name: "test", type: "rr" });
    loader.load(loader.paths.backbone + "structures/objects/uml/class");
    loader.load(loader.paths.backbone + "structures/objects/uml/ellipse");
    loader.load(loader.paths.backbone + "structures/objects/uml/actor");
    loader.load(loader.paths.backbone + "structures/objects/uml/binaryLink");

    //drawer classes
    loader.load(loader.paths.backbone + "structures/drawer/components/jd_class");
    loader.load(loader.paths.backbone + "structures/drawer/components/jd_ellipse");
    loader.load(loader.paths.backbone + "structures/drawer/components/jd_actor");
    loader.load(loader.paths.backbone + "structures/drawer/components/jd_binary_link");
    Drawer.canvas.addEventListener("binaryLinkPossible",function(e){
      console.log(e);
      let Link = {
        name:"link",
        type:"test",
        objectsToConnect:[]
      }
      Drawer.linkBuilder.forEach(objectId => {
        Link.objectsToConnect.push({objectId:objectId});
      });
      console.log(Link);
      let LinkDraw = new Jd_Binary_Link();
      LinkDraw.init(Link);
    })

    //loader.load(loader.paths.backbone +"structure/drawer/")
  }
});

function getStructure() {
  return {
    name: "test",
    type: "toto",
    attributes: {
      name: {
        name: "name",
        type: "string",
        value: "toto",
        visibility: "public",
      },
      surname: {
        name: "surname",
        type: "string",
        value: "toto",
        visibility: "package",
      },
    },
    methods:{
        create:{
            name:"create",
            type:"string",
            value:"",
            visibility:"private",
            params:{
                object:{
                    name:"structure",
                    value:"null",
                    type:"string",
                }
            }
        },
        tast:{
            name:"taste",
            type:"string",
            value:"",
            visibility:"private",
            params:{
                object:{
                    name:"structure",
                    value:"null",
                    type:"string",
                    
                }
            }
        }
    }
  };




}
function testClass(){
  var cl = new JdClass();
  var structure = Object.assign(getStructure());
  structure.name = "Personne";
  cl.configuration.position.x=15
  cl.configuration.position.y=35
  cl.init(structure)
}
function testEllipse(){
  var el = new JdEllipse();
  var structure = Object.assign(getStructure());
  structure.name = "User case";
  el.configuration.position.x=15
  el.configuration.position.y=35
  el.init(structure)
}
function enableLinkBuilder(){
  if (Drawer.isLinkBuilderEnabled()) {
    
    Drawer.disableLinkBuilder();
    
  }else{
    Drawer.enableLinkBuilder();
  }
  console.log(Drawer.linkBuilderState);
}
function testActor() {
  var el = new JdActor();
  var structure = Object.assign(getStructure());
  structure.name = "Actor";
  el.configuration.position.x=15
  el.configuration.position.y=35
  el.init(structure) 
}