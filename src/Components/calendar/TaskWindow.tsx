import React, { useState, useEffect} from "react";
import DatePicker from '../forms/DatePicker';
import TextArea from '../forms/TextArea';
import Select from "../forms/Select";
import addNewTask from "../../functions/tasks/addNewTask";
import { taskColour } from "../../TSTypes";

interface Props {
  visible: boolean;
  dateFrom: Date;
  dateTo: Date;
  onRequestClose: Function;
}

function NewTaskWindow(props: Props) {
  const [dateFrom, setDateFrom] = useState(props.dateFrom);
  const [dateTo, setDateTo] = useState(props.dateTo);
  const [title, setTitle] = useState('Новая задача');
  const [description, setDescription] = useState('');
  const [repeatable, setRepeatable] = useState('no');
  const [timeTo, setTimeTo] = useState('12:00');
  const [timeFrom, setTimeFrom] = useState('13:00');
  const [colour, setColour] = useState<taskColour>('green');
  const ref = React.createRef<HTMLDivElement>();

  function clickHandler (event: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) {
    event.preventDefault();
    if(event.type == 'keydown') {
      if ((event as React.KeyboardEvent<HTMLElement>).code!='Enter') return
    }
    addNewTask(title, dateFrom, dateTo, timeFrom, timeTo, repeatable, description, colour);
    props.onRequestClose(event);
  }

  useEffect(()=>{
    if(ref.current) {
      (ref.current.firstChild as HTMLElement).focus();
    }
    function escape(event: KeyboardEvent){
      if(event.key != 'Escape') return
      props.onRequestClose()
    }
    window.addEventListener('keydown', escape);
    return function cleanUp(){
      window.removeEventListener('keydown', escape);
    }
  }, [])
  
  return (
    <>
      <div
        id="newTask"
        style={{width: "100%", height: "100%", position: "absolute", display: "grid", left:"0px", top: "0px", zIndex: "99", }}
        onPointerDown = { (event) => {
            if (event.target != document.getElementById("newTask")) return
            props.onRequestClose(event);
          }
        }
      >
        <div role='dialog' className="newTaskWindow">
          <div ref={ref}>
            <input type='text' className='title' placeholder='Добавьте название задачи' onChange={(event: any)=> setTitle(event) } >
              </input>

            <button className="closeButton" onPointerDown={ (event) => {event.preventDefault(); props.onRequestClose(event)} }>
              <div style={{margin: "auto", fontSize: '18px'}} >✖</div>
            </button>
          </div>
          <div className="body" >
            <div style={{display: "flex"}}>
              <DatePicker date={dateFrom} setDate={setDateFrom} maxDate={dateTo}/>
              <div className="element" style={{userSelect: "none", pointerEvents: "none",}}> — </div>
              <DatePicker date={dateTo} setDate={setDateTo} minDate={dateFrom}/>
            </div>

            <Select options={['12:00', '13:00', '14:00', '15:00']} label='Время начала' className='element' setValue={(setTimeFrom)} />
            <Select options={['12:00', '13:00', '14:00', '15:00']} label='Время завершения' className='element' setValue={(setTimeTo)}/>
            <Select options={['green', 'orange', 'yellow', 'lightBlue', 'blue', 'purple']} label='Цвет' className='element' setValue={(setColour)}/>

            <Select
              options={['Не повторяется', 'Раз в год', 'Раз в месяц', 'Раз в неделю']}
              label='Повторяемость'
              className='element'
              setValue={(setRepeatable)}
            />

            <Select
              options={['Нььгагь повторяется', 'ьоьо год', 'Рркеркеоеяц', 'Арпрркереккереркер']}
              label='Птнввтняемость'
              className='element'
              setValue={(setRepeatable)}
            />

            <TextArea  placeholder="Введите описание" className="element" onChange={setDescription} />
            
          </div>
          <div role='presentation' style={{marginTop: "16px",}}>
            <button className="impButton" 
              onClick={ (event: React.MouseEvent<HTMLElement>)=> clickHandler(event)}
              onKeyDown={ (event: React.KeyboardEvent<HTMLElement>)=> clickHandler(event)}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewTaskWindow;