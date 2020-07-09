// text area input component
import React from 'react'

const TextAreaField = ({
                           type = "",
                           id = "",
                           required = false,
                           name = "",
                           value = "",
                           autocomplete = "off",
                           handClick = null,
                           handleChange = null,
                           handBlur = null,
                           className = ""
                       }) => {

    return (
        <textarea
            className={`${type} ${className}`}
            id={id}
            required={required}
            name={name}
            value={value}
            onClick={handClick}
            onChange={handleChange}
            onBlur={handBlur}
            autoComplete={autocomplete}
        >
        </textarea>
    )

};

export default TextAreaField
