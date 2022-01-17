import React, {useState, useEffect} from "react";
import Select_modal from "./Select_modal";
import positioning from "../../functions/positiononing";

/**
 * @component
 * renders select element
 */
function Select(props: {
    /** array of options */
    options?: Array<string>;
    /** setState for select value  */
    setValue: Function;
    /** aria-label */
    label: string;
    tabIndex?: number;
    /** className of HTML element */
    className: string
}) {
    const options= props.options ? props.options : [' ']; 
    const [modalIsVisible, setModalIsVisible] = useState(true);
    const [value, setValue] = useState(options[0]);
    const ref = React.createRef<HTMLDivElement>();
    const ref_modal = React.createRef<HTMLDivElement>();
    const [modalOpacity, setModalOpacity] = useState('0');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [x, setX] = useState('0 px');
    const [y, setY] = useState('0 px');

    /**
     * @function applyPositioning updates modal window position
     */
    function applyPositioning() {
      if(ref_modal.current && ref.current) {
          const coords = positioning(ref_modal.current, ref.current, 0, 0, 'left', 'bottom');
          setX(coords['newX']);
          setY(coords['newY']);
      }}

     /**
      * @function showModal shows modalWindow
      */
    function showModal() {
        if(ref_modal.current && ref.current) {
            const coords = positioning(ref_modal.current, ref.current, 0, 0, 'left', 'bottom');
            setX(coords['newX']);
            setY(coords['newY']);
        }
        setModalIsVisible(true);
    }

    /**
     * @function hideModal hides modalWindow
     */
    function hideModal() {
        setModalIsVisible(false);
        if(ref_modal.current && ref.current) {
            const coords = positioning(ref_modal.current, ref.current, 0, 0, 'left', 'bottom');
            setX(coords['newX']);
            setY(coords['newY']);
        }}

    /**
     * @function modalToggler toggles modal visiblity
     */
    function modalToggler() {
        if (modalIsVisible) {
            hideModal();
        } else {
            showModal();
        }}

    const Select_main:any = React.forwardRef<HTMLDivElement>((props, ref) => (
        <div ref={ref}>
          {props.children}
        </div>
      ));

      const Select_modal2:any = React.forwardRef<HTMLDivElement>((props, ref2) => (
        <div ref={ref2} style={{opacity: modalOpacity}} className={modalIsVisible ? 'expanded' : 'collapsed'}>
          {props.children}
        </div>
      ));

    useEffect(()=>{
        applyPositioning()
        if (modalOpacity == '0') {
            setModalOpacity('1');
            hideModal();
        }
    });
      
    /**
     * @function clickHandler calls setValue and modalToggler
     * @param event 
     */
    function clickHandler(event: React.MouseEvent<HTMLElement>) {
        if (event.target instanceof HTMLElement) {
            props.setValue((event.target as HTMLElement).dataset.value);
            setValue((event.target as HTMLElement).dataset.value as string);
            modalToggler();
            if (event.target.dataset.index) {
                setSelectedIndex(+event.target.dataset.index as number);
            }}}

    /**
     * @function changeValue changes selected value
     * @param event 
     * @returns 
     */
    function changeValue(event: React.KeyboardEvent) {
        if(event.code == 'Enter' || event.code == 'ArrowUp' || event.code == 'ArrowDown') {
            if (!modalIsVisible) showModal();
        };
        if(event.code != 'ArrowUp' && event.code != 'ArrowDown') return
        applyPositioning();
        let modifier = 0;
        if(event.code == 'ArrowUp') modifier = -1;
        if(event.code == 'ArrowDown') modifier = 1;
        let optionsCount = options.length-1; // from 0 to n
        if(+selectedIndex + modifier > optionsCount || +selectedIndex + modifier < 0) return
        let newIndex = +selectedIndex + modifier;
        setSelectedIndex(newIndex);
        setValue(options[newIndex]);
        props.setValue(options[newIndex]);
    }

    return(
            <Select_main ref={ref}>
                <div role={'listbox'}
                className={'select' + ' ' + props.className }
                aria-expanded={modalIsVisible}
                aria-label={props.label}
                tabIndex={props.tabIndex ? props.tabIndex : 0}
                onClick={(event)=> modalToggler()}
                onKeyDown={(event: React.KeyboardEvent) => changeValue(event)}
                >
                    <div className={'select_body' + ' ' + (modalIsVisible ? 'expanded' : 'collapsed')}>
                        {value}
                    </div>
                        <Select_modal2 ref={ref_modal}>
                            <Select_modal
                            parent={ref}
                            onRequestClose={(event: UIEvent)=>modalToggler()}
                            onClick={(event: React.MouseEvent<HTMLElement>)=>clickHandler(event)}
                            options={options}
                            selected={value}
                            setSelectedIndex={setSelectedIndex}
                            selectedIndex={selectedIndex}
                            className={modalIsVisible ? 'expanded' : 'collapsed'}
                            setPosition={{setX, setY}}
                            x={x}
                            y={y}
                            />
                        </Select_modal2>
                </div>
           </Select_main>

    )
}

export default Select;