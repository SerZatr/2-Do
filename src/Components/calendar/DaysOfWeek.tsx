/**
 * @component
 * renders days of weeks text. Expml: 'Пн'
 */
function DaysOfWeek() {
    return (
      <div role='row' className="daysOfWeek" data-testid='DaysOfWeek'>
        <div role='columnheader'>Пн</div>
        <div role='columnheader'>Вт</div>
        <div role='columnheader'>Ср</div>
        <div role='columnheader'>Чт</div>
        <div role='columnheader'>Пт</div>
        <div role='columnheader'>Сб</div>
        <div role='columnheader'>Вс</div>
      </div>
    )
  }

  export default DaysOfWeek;