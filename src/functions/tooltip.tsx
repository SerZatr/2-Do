import positioning from "./positiononing";

 interface tooltip {
    tooltipElement: HTMLDivElement;
    show: Function;
    hide: Function;
}

/**
 * onhover tooltip
 */
let tooltip: tooltip = {
    tooltipElement: document.createElement('div'),
    /**
     * @function shows tooltip
     * @param text text of tooltip
     * @param parent parent DOM element
     */
    show(text: string, parent: HTMLElement) {
        this.tooltipElement.innerHTML = text;
        this.tooltipElement.className = 'tooltip';
        document.body.append(this.tooltipElement);
        positioning(this.tooltipElement, parent, 0, -24, 'center', 'top')
    },
    /**
     * @function hides removes tooltip from DOM
     */
    hide() {
        this.tooltipElement.remove();
    }
}

export default tooltip;