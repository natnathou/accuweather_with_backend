// text input component
import React from "react"

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                {textLabel}
            </label>
        );
    }
};

const InputTextField = ({
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
                onBlur={handBlur}
                autoComplete={autocomplete}
                className={className}
            />
        </div>
    )
};


export default InputTextField
