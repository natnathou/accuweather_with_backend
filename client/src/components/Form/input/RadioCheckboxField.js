//checkbox component or radio component
import React from "react"

const labelTag = (label, textLabel, id, className) => {
    if (label) {
        return (
            <label htmlFor={id} className={className}>
                {textLabel}
            </label>
        )
    }
};

const RadioCheckboxField = ({
                                label = false,
                                textLabel = "",
                                type = "",
                                id = "",
                                required = false,
                                name = "",
                                placeholder = "",
                                value = "",
                                check = false,
                                autocomplete = "off",
                                handClick = null,
                                handleChange = null,
                                handBlur = null,
                                className = ""
                            }) => {
    return (
        <div className={type}>
            {labelTag(label, textLabel, id, className)}
            <input
                type={type}
                id={id}
                required={required}
                name={name}
                placeholder={placeholder}
                checked={check}
                value={value}
                onClick={handClick}
                onChange={handleChange}
                autoComplete={autocomplete}
                onBlur={handBlur}
            />
        </div>
    )
};


export default RadioCheckboxField
