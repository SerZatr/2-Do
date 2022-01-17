    /**
 * @function Set position of element to position of other one
 * @param {HTMLElement} Element Position of this element would be changed
 * @param {HTMLElement} SecodElement set position of first element to position of this one
 * @param {number|null} [xOffset=0]
 * @param {number|null} [yOffset=0]
 * @param {"left"|"center"|"right"|null} [alignment=left] left | center | right
 * @param {string|null} [valignment=bottom] top | middle | bottom
 */
export default function positioning (
    obj: HTMLElement, 
    parent: HTMLElement, 
    xOffset:number=0, 
    yOffset:number=0, 
    alignment:"left"|"right"|"center"|null='left', 
    valignment:"bottom"|"middle"|"top"|null='bottom'
): {newY:string, newX:string} {
let a = new Date();
if (!obj) return {newY:'0px', newX:'0px'}
if (!parent) return {newY:'0px', newX:'0px'}
let check1 = obj instanceof HTMLElement;
let check2 = parent instanceof HTMLElement;
if (!check1 || !check2) return {newY:'0px', newX:'0px'}
let parentCoords = {top:0, left:0, width:0, height:0}

if (parent instanceof HTMLElement) parentCoords = parent.getBoundingClientRect();
let objCoords = {top:0, left:0, width:0, height:0};

if (obj instanceof HTMLElement) {
    objCoords = obj.getBoundingClientRect();
}

let modifier = 0;
if (alignment == 'left') modifier = 0;
if (alignment == 'center') modifier = parentCoords.width/2 -objCoords.width/2;
if (alignment == 'right') modifier = parentCoords.width -objCoords.width;

let modifier_top = 0;
if (valignment == 'top') modifier_top = -parentCoords.height/2;
if (valignment == 'middle') modifier_top = 0;
if (valignment == 'bottom') modifier_top = parentCoords.height/2;

let newY = parentCoords.top + modifier_top + yOffset + 'px';
let newX = parentCoords.left + modifier + xOffset + 'px';

obj.style.top = newY;
obj.style.left = newX;

return {newY, newX};
} 



