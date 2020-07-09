import React from "react"
import {ReactComponent as Icon} from "../style/upload-solid.svg"

const labelTag = (label, textLabel, id) => {
    if (label) {
        return (
            <label htmlFor={id}>
                <Icon className="svgUpload"/>{` ${textLabel}`}
            </label>
        );
    }
};

const InputFileField = ({
                            label = false,
                            textLabel = "",
                            type = "",
                            id = "",
                            required = false,
                            name = "",
                            placeholder = "",
                            value = [""],
                            autocomplete = "off",
                            accept = "",
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
                accept={accept}
                onClick={handClick}
                onChange={handleChange}
                onBlur={handBlur}
                autoComplete={autocomplete}
                className={className}
                multiple
            />
        </div>
    )
};


export default InputFileField
