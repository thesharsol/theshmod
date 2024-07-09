import { indexOf, isArray } from "../../helpers/helper.js";
import { Base } from "../default/base.js";
import { Jd_Binary_Link } from "../drawer/components/jd_binary_link.js";
import { JdNamedCircle } from "../drawer/components/jd_namedCircle.js";
import { JdNamedSquare } from "../drawer/components/jd_namedSquare.js";
import { Jd_Top_Binary_Link } from "../drawer/components/jd_top_binary_link.js";
import { drawer } from "../drawer/drawer.js";
import { jsmNamedCircle } from "../objects/freeShapes/nameCircle.js";
import { jsmNamedSquare } from "../objects/freeShapes/namedSquare.js";

export class Genograph extends Base {
    #tree = {};
    #configuration = {
        width: 0,
        height: 0,
        space: 50
        // padding
    }
    #links = [];
    #objectsReferences = {};
    constructor(Genograph) {
        super(Genograph)
    }
    get objectsReferences() {
        return this.#objectsReferences
    }
    objectReference(id) {
        return this.#objectsReferences[id];
    }
    set objectsReference(ref) {
        this.#objectsReferences[ref.id] = ref.ref;
    }
    get links() {
        return this.#links;
    }
    set links(links) {
        this.#links = links;
    }
    get tree() {
        return this.#tree;
    }
    set tree(tree) {
        this.#tree = tree;
    }
    get configuration() {
        return this.#configuration;
    }
    set configuration(configuration) {
        this.#configuration = configuration;
    }
    configure() {
        // console.log(10);

        this.tree.forEach(level => {
            let lineWidth = 0;
            level.forEach(member => {
                lineWidth += this.memberWidth(member);
            });
            lineWidth += (this.configuration.space * (level.length - 1))
            console.log(lineWidth)
            if (this.configuration.width < lineWidth) {
                this.configuration.width = lineWidth;
            }
        });
    }
    memberWidth(member) {
        if (drawer.textWidth(member.n) > 40) {
            return drawer.textWidth(member.n);
        }
        return 40;
    }
    sort() {
        let output = [];
        let datas = this.tree;
        this.sortTree(datas, output);
        this.tree = output;
        console.log(output);
    }
    draw(params) {

        let levelIndex = 1;
        this.tree.forEach(level => {
            let memberIndex = 0;
            level.forEach(member => {
                let position = { x: 50 + (this.configuration.space * memberIndex), y: 70 * levelIndex };
                if (isArray(member)) {
                    let subMemberIndex = 0;
                    member.forEach(subMember => {
                        console.log(position.x)
                        this.drawMember(subMember, position)
                        memberIndex++;
                        position.x = 50 + (this.configuration.space * memberIndex)
                    });
                } else {
                    this.drawMember(member, position)
                }
                memberIndex++;
            });
            levelIndex++;
        });
        this.drawLinks()
        console.log(this.objectsReferences);
    }
    drawMember(member, position) {
        let memberShape = {};
        switch (member.s) {
            case "f":
                memberShape = new JdNamedCircle();
                memberShape.configuration.ray.x = 20;
                memberShape.configuration.ray.y = 20;
                memberShape.configuration.position.y = position.y;
                memberShape.configuration.position.x = position.x;
                memberShape.init({ name: member.n, type: member.s })
                this.objectsReference = { ref: drawer.objects.length - 1, id: member.id };
                break;
            case "m":
            case undefined:
                memberShape = new JdNamedSquare();
                memberShape.configuration.ray.x = 20;
                memberShape.configuration.ray.y = 20;
                memberShape.configuration.position.y = position.y;
                memberShape.configuration.position.x = position.x;
                memberShape.init({ name: member.n, type: member.s });
                this.objectsReference = { ref: drawer.objects.length - 1, id: member.id };


                break;
            default:
                break;
        }
    }
    drawLinks() {
        this.tree.forEach(level => {
            level.forEach(member => {
                if (isArray(member)) {
                    member.forEach(subMember => {
                        if (subMember.h != undefined || subMember.w != undefined) {

                            let link = new Jd_Top_Binary_Link();
                            link.init({ name: "test", type: "test", connectedObjects: [{ objectId: this.objectReference(subMember.id) }, { objectId: this.objectReference(subMember.h ?? subMember.w) }] });
    
                        }
                    });
                } else {
                    if (member.h != undefined || member.w != undefined) {

                        let link = new Jd_Binary_Link();
                        link.init({ name: "test", type: "test", connectedObjects: [{ objectId: this.objectReference(member.id) }, { objectId: this.objectReference(member.h ?? member.w) }] });

                    }
                }

            });
        });
    }
    removeLine(linesToRemove, arr) {
        let out = [];
        for (let i = 0; i < arr.length; i++) {
            indexOf(linesToRemove, i) == -1 ? out.push(arr[i]) : null;
        }
        return out;
    }
    findInLevelArray(members, searchedMember) {
        console.log(members)
        let output = false;
        members.forEach(member => {
            if (isArray(member)) {
                output = indexOf(member, searchedMember) == -1 ? false : true;
            }
        });

        return output;
    }
    getFromId(datas, id) {
        let ret = { f: '', m: '' };
        datas.forEach(member => {
            if (member.id == id) {
                // alert(member.m)
                ret = member;
            }
        });
        return ret;
    }
    sortTree(datas = [], output = []) {

        if (datas.length > 0) {
            let level = [];
            let linesToRemove = [];

            if (output.length == 0) {
                for (let i = 0; i < datas.length; i++) {
                    // alert(this.getFromId(datas, datas[i].h).m)
                    console.log((this.getFromId(datas, datas[i].h)))
                    if (datas[i].f == undefined && datas[i].m == undefined && ((datas[i].h == undefined && datas[i].w == undefined)
                        || ((datas[i].h != undefined && this.getFromId(datas, datas[i].h).m == undefined) || (datas[i].w != undefined && this.getFromId(datas, datas[i].w).m == undefined)))) {
                        level.push(datas[i]);
                        linesToRemove.push(i);
                        console.log(level)
                    }
                }
            } else {
                let parents = output[output.length - 1];
                let childIndex = 0, husbandIndex = 0;
                parents.forEach(parent => {
                    for (let j = 0; j < datas.length; j++) {
                        if (datas[j].m == parent.id || datas[j].f == parent.id) {
                            console.log(level)
                            if (indexOf(level, datas[j]) == -1 && !this.findInLevelArray(level, datas[j])) {
                                // level.push(datas[j])
                                linesToRemove.push(j);
                                let hus = [];
                                for (let k = 0; k < datas.length; k++) {

                                    if (datas[k].h != undefined && datas[k].h == datas[j].id) {
                                        if (indexOf(level, datas[k]) == -1) {
                                            hus.push(datas[k]);
                                            linesToRemove.push(k);
                                        }
                                    }
                                }
                                console.log(hus);
                                console.log(parent)
                                if (hus.length > 0) {
                                    hus.push(datas[j]);
                                    level.push(hus);
                                } else {
                                    level.push(datas[j]);

                                }
                            }
                        }

                    }
                });

            }
            datas = this.removeLine(linesToRemove, datas);
            output.push(level);
            console.log(output)
            this.sortTree(datas, output);
        } else {
            return;
        }

    }
}