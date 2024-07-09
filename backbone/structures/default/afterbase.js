/* 
@name:AfterBase
@parent:Base
@version:1.0
@description:This class defines the structure of the folders located after the base
of the system. These are components that will store other elements and in which it will be possible to navigate.
@author:BEBE EPEE Ivan Sampi

*/

import { hasIndex, isInt, isNull, spaceWords } from "../../helpers/helper.js";
import { Base } from "./base.js";

export class AfterBase extends Base {
    #elements = [];
    #selectedElement = null;
    constructor(afterBase = {}) {
        super(afterBase);
        if (this.constructor === AfterBase) {
            throw (spaceWords(["AfterBase", lang.errors.abstractError], 1))
        }
    }
    /* 
    @name:elements
    @description:return the list of the elements 
    @return:object
    */
    get elements() {
        return this.#elements;
    }
    /* 
    @name:elements
    @param:elements
    @description:set the list of the elements 
    */
    set elements(elements) {
        this.elements = elements;
    }
    /* 
    @name:element
    @param:element
    @description: add an element to the element list
    */
    set element(element) {
        this.elements.push(element);
    }
    /* 
    @name:getElement
    @param:index
    @description:returns the element corresponding to the index 
    passed in the array of elements or an empty array if no match is found  
    @return:object
    */
    getElement(index) {
        if (hasIndex(this.elements, index)) {
            return this.elements[index];
        } else {
            return {};
        }
    }
    /* 
    @name:selectedElementIndex
    @description:returns the index of the selecte element
    passed in the array of elements or an empty array if no match is found  
    @return:interger
    */
    get selectedElementIndex() {
        return this.#selectedElement;
    }
    /* 
    @name:selectedElement
    @description:returns the element corresponding to the index of the selected element
     in the array of elements or an empty array if no match is found  
    @return:object
    */
    get selectedElement() {
        if (!isNull(this.selectedElementIndex) && hasIndex(this.elements, this.selectedElementIndex)) {
            return this.elements[this.selectedElementIndex]
        }
        return {};
    }
    /* 
    @name:selectedElement
    @param:index
    @description: define the selected element */
    set selectedElement(index) {
        if (isInt(index) && hasIndex(this.elements, index)) {
            this.#selectedElement = index;
        }
    }
    /* 
    @name:addElement
    @param:element
    @description: add the given element to the element list*/
    addElement(Element) {
        try {
            var prod = Element;
            this.elements.push(prod);
        } catch (error) {
            console.error(error);
        }
    }
}