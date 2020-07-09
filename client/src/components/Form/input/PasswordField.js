//input password component
import React from "react"

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                {textLabel}
            </label>
        )
    }
};

const PasswordField = ({
                           label = false,
                           textLabel = "",
                           type = "",
                           id = "",
                           required = false,
                           name = "",
                           placeholder = "",
                           value = "",
                           autocomplete = "off",
                           handClick = null,
                           handleChange = null,
                           handBlur = null,
                           className = ""
                       }) => {
                        if(autocomplete==="off"){
                            autocomplete="new-password"
                        }
    return (
        <div className={type}>
            {labelTag(label, textLabel, id)}
            <input
                type={type}
                id={id}
                required={required}
                name={name}
                placeholder={placeholder}
                value={value}
                onClick={handClick}
                onChange={handleChange}
                autoComplete={autocomplete}
                onBlur={handBlur}
                className={className}
            />
        </div>
    )
};


export default PasswordField
