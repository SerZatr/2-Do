import React, {useState, useEffect} from 'react';
import DatePicker_modal from './DatePicker_modal'
import tooltip from '../../functions/tooltip';
import monthName from '../../functions/monthName';

const DatePicker_main:any = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref}>
    {props.children}
  </div>
));

/**
 * @component
 * Renders datepicker
 */
function DatePicker(props: {
  /** selected date */
  date: Date;
  /** Function, that should update parrent element state */
  setDate: Function;
  /** tabIndex */
  tabIndex?: number;
  /** Selected date cannot be earlier than minDate */
  minDate?: Date;
  /** Selected date cannot be later than maxDate */
  maxDate?: Date;
}) {
    const [date, setDate] = useState(props.date);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const datePicker_elem = React.createRef<HTMLDivElement>();
    const [className, setClassName] = React.useState('element');
    const [errorMessage, setErrorMessage] = React.useState<string|null>(null);

    function openModal(event: React.MouseEvent<HTMLElement>) {
      if(!event.target) return
      if (event.target instanceof HTMLElement) {
        setModalIsVisible(!modalIsVisible);
      }}

    function checkData(d: Date) {
      let error = false;
      if(props.minDate) {
          if(date < props.minDate) {
            error = true;
            setErrorMessage('Дата не может быть больше, чем ' + date.getDate() + ' ' + monthName(props.minDate, 'full', false, 'genitive'));
          }}

      if(props.maxDate) {
          if(date > props.maxDate) {
            error = true;
            setErrorMessage('Дата не может быть меньше, чем ' + date.getDate() + ' ' + monthName(props.maxDate, 'full', false, 'genitive'));
          }}

      if(error) {
        setClassName('element' + ' ' + 'error')
      } else {
        setClassName('element')
        setErrorMessage(null);
      }}

    function handleClick(event: React.MouseEvent<HTMLElement>, d: Date) {
      setModalIsVisible(!modalIsVisible);
      setDate(d);
      props.setDate(d);
      checkData(d);
    };

    useEffect(()=>{
      checkData(date);
    })
    useEffect(()=>{
      return function cleanUp() {
        tooltip.hide()
      }
    })

    return (
      <DatePicker_main ref={datePicker_elem}>
        <div
          role='listbox'
          className={className}
          data-date={props.date}
          onClick={ (event: React.MouseEvent<HTMLElement>) => openModal(event) }
          tabIndex={props.tabIndex? props.tabIndex : 0}
          onMouseEnter={(event:any)=> {if(errorMessage!==null){tooltip.show(errorMessage, event.target)}}}
          onMouseLeave={(event:any)=>tooltip.hide()}
          data-testid='DatePicker'
          >
          {date.getDate() + ' ' + monthName(date, 'mini')}
        </div>

        {modalIsVisible &&
        <DatePicker_modal date={date} isVisible={modalIsVisible} parent={datePicker_elem}
          onRequestClose={ (event: UIEvent)=>  setModalIsVisible(!modalIsVisible) }
          onClick={ (event: React.MouseEvent<HTMLElement>, d: Date) => handleClick(event, d, ) }
          />
          }
      </DatePicker_main>
    )}

  export default DatePicker;