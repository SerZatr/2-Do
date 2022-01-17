import React, {useState, useEffect} from 'react';
import './style.css';
import TaskWindow from "./Components/calendar/TaskWindow";
import Calendar from './Components/calendar/Calendar';
//localStorage.clear();

function App() {
  let media = window.matchMedia('(max-width: 600px)');
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [modal_date_from, setModal_date_from] = useState( new Date() );
  const [modal_date_to, setModal_date_to] = useState( new Date() );
  const [mobileVersion, setMobileVersion] = useState(media.matches);

  function handleClick(event: React.MouseEvent<HTMLElement>, d: Date) {
    setModalIsVisible(!modalIsVisible);
    setModal_date_from(d);
    setModal_date_to(d);
  }

  // удалить
  useEffect(()=>{
    media.addEventListener("change", ()=>setMobileVersion(media.matches));
    return function cleanUp() {
      media.removeEventListener("change", ()=>setMobileVersion(media.matches));
    }
  })

  return (
    <div style={{display: 'block', width:'100%', height:'100%'}}>
      <div id="itemsList" className="itemsList" style={{display: mobileVersion ? 'none' : 'block'}}>
          <div style={{width: '100%'}}>
            <button id="newTaskButton" className="newTaskButton" onClick={(event: React.MouseEvent<HTMLElement>)=> handleClick(event, new Date())}>Новая задача
            </button>
          </div>
          <div className = "itemsInner">
            <div style={{margin: 'auto', paddingBottom: '36px', textAlign:'center', width:'70%'}}>
              <div style = {{fontSize: '22px', fontWeight: '800px', color: '#777', paddingBottom: '8px'}}>Список задач
              </div>
              <div>Пока что список пуст.<br /> Нажмите на кнопку сверху, чтобы создать первую задачу
              </div>
            </div>
          </div>
        </div>
      
    <div role='main' style={{height:'100%'}}>
      <Calendar onClick={ (event: React.MouseEvent<HTMLElement>, d:Date)=> handleClick(event, d) }/>
    </div>
    <div>
      {
      modalIsVisible && <TaskWindow
      visible={modalIsVisible}
      dateFrom={modal_date_from}
      dateTo={modal_date_to}
      onRequestClose={ () => setModalIsVisible(!modalIsVisible) }
      />
      }
    </div>
  </div>
  )
}

export default App;