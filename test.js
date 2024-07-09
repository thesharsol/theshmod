import { jsmSpace } from "./backbone/structures/default/workspace.js";
import { JdActor } from "./backbone/structures/drawer/components/jd_actor.js";
import { Jd_Binary_Link } from "./backbone/structures/drawer/components/jd_binary_link.js";
import { JdClass } from "./backbone/structures/drawer/components/jd_class.js";
import { JdEllipse } from "./backbone/structures/drawer/components/jd_ellipse.js";
import { JdNamedCircle } from "./backbone/structures/drawer/components/jd_namedCircle.js";
import { JdNamedSquare } from "./backbone/structures/drawer/components/jd_namedSquare.js";
import { drawer } from "./backbone/structures/drawer/drawer.js";
import { Genograph } from "./backbone/structures/graph/genograph.js";
document.addEventListener("readystatechange", function () {
    if (document.readyState == "complete") {


        jsmSpace.addProject({ name: "test", type: "rr" });
        jsmSpace.selectedProject.addModel({ name: "test", type: "rr" });
        // 
        let genograph = new Genograph({ name: 'test', type: 'type' });
        genograph.tree = [
            { n: "ivan", f: 2, m: 3, id: 0, s: "m" },
            { n: "mater", id: 3, s: "f", h:2 },
            { n: "diane", f: 2, m: 3, id: 9, s: "f" },

            { n: "pater", id: 2, s: "m" },

            { n: "ilda", f: 4, id: 5, s: "f" },
            { n: "steph", h: 4, id: 6, s: "f" },
            { n: "ruth", h: 4, id: 7, s: "f" },
            { n: "gilles", f: 2, m: 3, id: 4, s: "m" },

            { n: "zola", h: 4, id: 79, s: "f" },
            { n: "marie", h: 4, id: 8, s: "f" },

        ]
        console.log(genograph.tree)
        genograph.sort();
        genograph.configure();
        genograph.draw()
        console.log(genograph.configuration.width)
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
                methods: {
                    create: {
                        name: "create",
                        type: "string",
                        value: "",
                        visibility: "private",
                        params: {
                            object: {
                                name: "structure",
                                value: "null",
                                type: "string",
                            }
                        }
                    },
                    tast: {
                        name: "taste",
                        type: "string",
                        value: "",
                        visibility: "private",
                        params: {
                            object: {
                                name: "structure",
                                value: "null",
                                type: "string",

                            }
                        }
                    }
                }
            };




        }
        function testClass() {
            var cl = new JdClass();
            var structure = Object.assign(getStructure());
            structure.name = "Personne";
            cl.configuration.position.x = 15
            cl.configuration.position.y = 35
            cl.configuration.fillColor = "#efefef"

            cl.init(structure)
        }
        testClass();

        function testEllipse() {
            var el = new JdEllipse();
            var structure = Object.assign(getStructure());
            structure.name = "User case dwwwwwwwwww";
            el.configuration.position.x = 15
            el.configuration.position.y = 35
            el.configuration.fontSize = 20
            el.init(structure)
        }
        // testEllipse();
        function testNamedCircle() {
            var el = new JdNamedCircle();
            var structure = Object.assign(getStructure());
            structure.name = "zayde";
            el.configuration.position.x = 15
            el.configuration.position.y = 35
            el.configuration.fontSize = 20
            el.configuration.ray.x = 20
            el.configuration.ray.y = 20
            el.init(structure)
        }
        // testNamedCircle();
        function testNamedSquare() {
            var el = new JdNamedSquare();
            var structure = Object.assign(getStructure());
            structure.name = "zayde";
            el.configuration.position.x = 15
            el.configuration.position.y = 35
            el.configuration.fontSize = 20
            el.configuration.ray.x = 20
            el.configuration.ray.y = 20
            el.configuration.textColor = "white";
            el.init(structure)
        }
        testNamedSquare();
        function enableLinkBuilder() {
            if (drawer.isLinkBuilderEnabled()) {

                drawer.disableLinkBuilder();

            } else {
                drawer.enableLinkBuilder();
            }
            console.log(drawer.linkBuilderState);
        }
        drawer.canvas.addEventListener("binaryLinkPossible", () => {
            // alert();
            // let link = new Jd_Binary_Link();
            // drawer.linkBuilder.forEach(objId => {
            //     link.connected
            // });
            // let connectedObjects = [];
            // for (let i = 0; i < drawer.linkBuilder.length; i++) {
            //     connectedObjects[i] = {objectId:drawer.linkBuilder[i]}
            // }
            // // console.log(connectedObjects)
            // link.init({ name: "est", type: "any", connectedObjects: connectedObjects });
        })
        // enableLinkBuilder();
        function testActor() {
            var el = new JdActor();
            var structure = Object.assign(getStructure());
            structure.name = "BEBE EPEE Ivan Sampi";
            el.configuration.position.x = 15
            el.configuration.position.y = 35
            el.init(structure)
        }
        testActor();
    }
})