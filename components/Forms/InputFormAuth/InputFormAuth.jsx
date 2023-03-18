import React from 'react'
import Form from 'react-bootstrap/Form';

const InputFormAuth = ({title, name, onchange, type, className, placeholder, required}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label className='text-light fw-semibold'>{title}</Form.Label>
      <Form.Control 
        type={type} 
        name={name} 
        onChange={onchange} 
        placeholder={placeholder} 
        className={`${className} bg-transparent pt-0 shadow-none border-0 border-2 border-bottom rounded-0`}
        required={required || false}
      />
    </Form.Group>
  )
}

export default InputFormAuth