import React from 'react'
import style from './Accordion.module.css'

const Accordion = ({children, title, id}) => {
  return (
    <div className="accordion border-0" id="accordionPanelsStayOpenExample">
      <div className="accordion-item bg-transparent border-0">
        <h2 className="accordion-header px-0 text-secondary" id="panelsStayOpen-headingOne">
          <button className="accordion-button px-0 pt-0 bg-transparent border-0 text-secondary fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOne${id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseOne${id}`}>
            {title}
          </button>
        </h2>
        <div id={`panelsStayOpen-collapseOne${id}`} className={`${style.accordionBody} accordion-collapse collapse show`} aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body px-0 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accordion