import React from 'react'
import style from './AccordionRightMenu.module.css'

const AccordionRightMenu = ({title,total, children, id}) => {
  return (
    <div className="accordion border-0" id="accordionPanelsStayOpenExample">
      <div className="accordion-item bg-transparent border-0">
        <h2 className="accordion-header px-0 text-secondary" id="panelsStayOpen-headingOne">
          <button className="accordion-button px-0 pt-0 bg-transparent fw-semibold fs-4 border-0 text-light fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-collapseOneMenu${id}`} aria-expanded="true" aria-controls={`panelsStayOpen-collapseOneMenu${id}`}>
            <div className="imagesInfo d-flex flex-column">
              <span>{title}</span>
              <span className='text-medium text-secondary'>
                {total || `140 items`}
              </span>
            </div>
          </button>
        </h2>
        <div id={`panelsStayOpen-collapseOneMenu${id}`} className={`${style.accordionBody} accordion-collapse collapse show`} aria-labelledby="panelsStayOpen-headingOne">
          <div className="accordion-body px-0 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccordionRightMenu