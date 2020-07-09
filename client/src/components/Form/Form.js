import React from "react"
import {connect} from "react-redux"
import _ from "lodash"
import Button from "./Button/Button"
import InputTextField from "./input/InputTextField"
import InputFileField from "./input/InputFileField"
import TextAreaField from "./input/TextAreaField"
import SelectField from './input/SelectField'
import RadioCheckboxField from "./input/RadioCheckboxField"
import PasswordField from "./input/PasswordField"
import {
    formModify,
    radioModify,
    formPropsInitialize,
    formPropsRadioInitialize,
    formPropsModify,
    formPropsRadioModify,
    formPropsRadioModifyProperty,
    errorStatue,
    formSend,
    setResponseMessageError
} from "../../actions/actions"
import "./style/Form.css"


class Form extends React.Component {

    componentDidMount() {
        //value form initialization
        this.initializeValue(this.props.formField)

        this.initializePropsValue(this.props.formField)
        //value props initilization

    }

    initializePropsValue = json => {
        return json.map(data => {

            switch (data.type) {
                case "file":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch            : false,
                            required         : data.required,
                            display          : data.display,
                            extensionAccepted: data.extensionAccepted,
                            filesContent     : []
                        }
                    }, this.props.nameForm);
                case "text":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "email":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "number":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "tel":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "password":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "radio":
                    return this.props.formPropsRadioInitialize({
                        [data.name]: {
                            [data.value]: {
                                touch   : false,
                                required: data.required
                            }
                        }
                    }, data.name, data.value, this.props.nameForm);
                case "checkbox":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "big_text":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch   : false,
                            required: data.required
                        }
                    }, this.props.nameForm);
                case "list":
                    return this.props.formPropsInitialize({
                        [data.name]: {
                            touch      : false,
                            required   : data.required,
                            optionArray: data.optionArray
                        }
                    }, this.props.nameForm);
                default:
                    return null
            }
        })
    };

    initializeValue = json => json.map(async data => {
        switch (data.type) {
            case "file":
                await this.props.formModify({[data.name]: [""]}, this.props.nameForm);
                this.props.formValue[data.name][0] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "text":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "email":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "number":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "tel":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "password":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "radio":
                await this.props.radioModify({[data.name]: {[data.value]: data.initialChecked}}, data.name, data.value, this.props.nameForm);
                let err        = true;
                let checkError = () => _.toArray(this.props.formValue[data.name]).forEach((data) => {
                    if (data) {

                        err = false
                    }
                });

                checkError();
                err && this.props.formProps[data.name][data.value]["required"]
                    ?
                    await this.props.formPropsRadioModifyProperty({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    this.props.formPropsRadioModifyProperty({[data.name]: {error: false}}, this.props.nameForm);
                break;

            case "checkbox":
                await this.props.formModify({[data.name]: data.initialChecked}, this.props.nameForm);
                !this.props.formValue[data.name] && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "big_text":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === "" && this.props.formProps[data.name]["required"]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            case "list":
                await this.props.formModify({[data.name]: data.initialValue}, this.props.nameForm);
                this.props.formValue[data.name] === this.props.formProps[data.name]["optionArray"][0]
                    ?
                    await this.props.formPropsModify({[data.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[data.name]: {error: false}}, this.props.nameForm);
                break;
            default:
                break
        }
    });

    // method to display error message when the input is empty if the input is required
    renderError = (data) => {
        if (this.props.formProps[data.name]) {
            switch (data.type) {
                case "file":

                    //check if error after that the input is touched
                    if (this.props.formProps[data.name]["touch"] && this.props.formValue[data.name][0] === "" && data.required) {
                        return <div className="Error">{data.error}</div>
                    }
                    //check if error when we wil send our form
                    if (this.props.formValue[data.name][0] === "" && data.required && this.props.displayError) {
                        return <div className="Error">{data.error}</div>
                    } else {
                        return null
                    }

                case   "checkbox":
                    //check if error after that the input is touched
                    if (this.props.formProps[data.name]["touch"] && !this.props.formValue[data.name] && data.required) {
                        return <div className="Error">{data.error}</div>
                    }
                    //check if error when we wil send our form
                    if (!this.props.formValue[data.name] && data.required && this.props.displayError) {
                        return <div className="Error">{data.error}</div>
                    } else {
                        return null
                    }

                case   "radio":
                    //check if error when we wil send our form (ww dont check touched because if the input is a radio we cannot touch if without to select it so it cannot be empty)
                    if (this.props.formProps[data.name]["error"] && this.props.displayError) {
                        return <div className="Error">{data.error}</div>
                    } else {
                        return null
                    }


                case   "list":
                    //check if error after that the input is touched
                    if (this.props.formProps[data.name]["touch"] && this.props.formValue[data.name] === data.optionArray[0] && data.required) {
                        return <div className="Error">{data.error}</div>
                    }
                    //check if error when we wil send our form
                    if (this.props.formValue[data.name] === data.optionArray[0] && data.required && this.props.displayError) {
                        return <div className="Error">{data.error}</div>
                    } else {
                        return null
                    }

                default:
                    //check if error after that the input is touched
                    if (this.props.formProps[data.name]["touch"] && this.props.formValue[data.name] === "" && data.required) {
                        return (<div className="Error">{data.error}</div>)
                    }
                    //check if error when we wil send our form

                    if (this.props.formValue[data.name] === "" && data.required && this.props.displayError) {
                        return (<div className="Error">{data.error}</div>)
                    } else {
                        return null
                    }
            }
        }

    };

    //method to render an image if the file selected is an image (render with file reader)
    imageRender = (data) => {
        if (this.props.formValue[data.name][0] !== "" && this.props.formProps[data.name]["display"]) {
            return this.props.formProps[data.name]["filesContent"].map((datas, index) => {
                if (datas.type === "image/jpeg" || datas.type === "image/png") {
                    return <img src={datas.content} alt={`${this.props.formValue[data.name][index]["name"]}`}
                                key={index}/>
                } else {
                    return null
                }
            })
        }
    };

    renderResponseMessageError = () => {
        if (this.props.responseErrorMessage !== "") {
            return <div className="Error">{this.props.responseErrorMessage}</div>
        }
    };


//methode to map our json and check which input we will render
    renderInput = json => json.map((data, index) => {
        let error = false;
        //error variable value assignation to check when we will pass the class ErrorColor to our input
        if (this.props.formProps && this.props.formValue) {
            if (this.props.formProps[data.name]) {
                switch (data.type) {
                    case "checkbox":
                        if (this.props.formProps[data.name]["touch"] && !this.props.formValue[data.name] && data.required) {
                            error = true;
                        }
                        if (this.props.displayError && !this.props.formValue[data.name] && data.required) {
                            error = true;
                        }
                        break;
                    case "list":
                        if (this.props.formProps[data.name]["touch"] && this.props.formValue[data.name] === data.optionArray[0] && data.required) {
                            error = true;
                        }
                        if (this.props.displayError && this.props.formValue[data.name] === data.optionArray[0] && data.required) {
                            error = true;
                        }
                        break;
                    case "file":
                        if (this.props.displayError && this.props.formValue[data.name][0] === "" && data.required) {
                            error = true;
                        }
                        break;
                    default:
                        if (this.props.formProps[data.name]["touch"] && this.props.formValue[data.name] === "" && data.required) {
                            error = true;
                        }
                        if (this.props.displayError && this.props.formValue[data.name] === "" && data.required) {
                            error = true;
                        }
                        break
                }
            }

            // map our json to check which type of input we will render
            switch (data.type) {
                case "file":
                    //text label vale assignation ("select your file or number of file uploaded")
                    if (this.props.formValue[data.name]) {
                        let textLabel = data.textLabel;

                        if (this.props.formProps[data.name]["filesContent"][0] !== "" && this.props.formProps[data.name]["filesContent"].length === 1) {
                            textLabel = "1 File Uploaded"
                        }
                        if (this.props.formProps[data.name]["filesContent"][0] !== "" && this.props.formProps[data.name]["filesContent"].length > 1) {
                            textLabel = `${this.props.formProps[data.name]["filesContent"].length} Files Uploaded`
                        }

                        return (
                            <div key={index}>
                                <InputFileField
                                    label={data.label}
                                    textLabel={textLabel}
                                    type={data.type}
                                    id={data.id}
                                    required={data.required}
                                    name={data.name}
                                    placeholder={data.placeholder}
                                    value={this.props.formValue[data.name][0].name ? `C:\\fakepath\\${this.props.formValue[data.name][0].name}` : undefined}
                                    accept={data.extensionAccepted}
                                    handClick={this.handClick}
                                    handleChange={this.handleChange}
                                    handBlur={this.handBlur}
                                    autocomplete={data.autocomplete}
                                    className={error ? "ErrorColor" : ""}
                                />
                                {this.renderError(data)}
                                <div className="Image">{this.imageRender(data)}</div>
                            </div>
                        )

                    } else {
                        return null
                    }

                case "text":
                    return (
                        <div key={index}>
                            <InputTextField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "email":
                    return (
                        <div key={index}>
                            <InputTextField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "number":
                    return (
                        <div key={index}>
                            <InputTextField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "tel":
                    return (
                        <div key={index}>
                            <InputTextField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "password":
                    return (
                        <div key={index}>
                            <PasswordField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>
                    );
                case "radio":
                    if (this.props.formValue[data.name]) {
                        return (
                            <div key={index}>
                                <RadioCheckboxField
                                    label={data.label}
                                    textLabel={data.textLabel}
                                    type={data.type}
                                    id={data.id}
                                    required={data.required}
                                    name={data.name}
                                    placeholder={data.placeholder}
                                    value={data.value}
                                    check={this.props.formValue[data.name][data.value]}
                                    handClick={this.handClick}
                                    handleChange={this.handleChange}
                                    handBlur={this.handBlur}
                                    autocomplete={data.autocomplete}
                                    className={error ? "ErrorColorRadioCheckbox" : ""}
                                />
                                {this.renderError(data)}
                            </div>
                        )
                    } else {
                        return null
                    }


                case "checkbox":
                    return (
                        <div key={index}>
                            <RadioCheckboxField
                                label={data.label}
                                textLabel={data.textLabel}
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                placeholder={data.placeholder}
                                value={data.value}
                                check={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColorRadioCheckbox" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "big_text":
                    return (
                        <div key={index}>
                            <TextAreaField
                                type={data.type}
                                id={data.id}
                                required={data.required}
                                name={data.name}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                case "list":
                    return (
                        <div key={index}>
                            <SelectField
                                type={data.type}
                                label={data.label}
                                textLabel={data.textLabel}
                                id={data.id}
                                name={data.name}
                                optionArray={data.optionArray}
                                value={this.props.formValue[data.name]}
                                handClick={this.handClick}
                                handleChange={this.handleChange}
                                handBlur={this.handBlur}
                                autocomplete={data.autocomplete}
                                className={error ? "ErrorColor" : ""}
                            />
                            {this.renderError(data)}
                        </div>

                    );
                default:
                    return null
            }

        }
        return null


    });

//change event
    handleChange = async (event) => {
        event.persist();
        switch (event.target.type) {
            case "checkbox":
                await this.props.formModify({[event.target.name]: event.target.checked}, this.props.nameForm);
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                !this.props.formValue[event.target.name] && this.props.formProps[event.target.name]["required"]
                    ?
                    await this.props.formPropsModify({[event.target.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[event.target.name]: {error: false}}, this.props.nameForm);
                break;

            case "radio":
                await this.props.radioModify({[event.target.name]: {[event.target.value]: event.target.checked}}, event.target.name, event.target.value, this.props.nameForm);
                await this.props.formPropsRadioModify({[event.target.name]: {[event.target.value]: {touch: true}}}, this.props.nameForm);
                if (this.props.formProps[event.target.name][event.target.value]["required"]) {
                    this.props.formPropsRadioModifyProperty({[event.target.name]: {error: false}}, this.props.nameForm)
                }

                break;

            case "select-one":
                await this.props.formModify({[event.target.name]: event.target.value}, this.props.nameForm);
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                this.props.formValue[event.target.name] === this.props.formProps[event.target.name]["optionArray"][0]
                    ?
                    await this.props.formPropsModify({[event.target.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[event.target.name]: {error: false}}, this.props.nameForm);
                break

            case "file":
                if (event.target.files[0]) {
                    await this.props.formModify({[event.target.name]: event.target.files}, this.props.nameForm);
                    await this.props.formPropsModify({[event.target.name]: {filesContent: []}}, this.props.nameForm);
                    const handleFile = async (e) => {
                        const content = e.target.result;
                        let obj       = {};
                        obj.data      = content.split(";")[0].split(":")[1];
                        obj.base64    = content.split(";")[1].split(",")[1];
                        await this.props.formPropsModify({
                            [event.target.name]: {
                                filesContent: [...this.props.formProps[event.target.name]["filesContent"], {
                                    type   : obj.data,
                                    content: content
                                }]
                            }
                        }, this.props.nameForm)
                    };

                    _.toArray(event.target.files).forEach(data => {
                        let fileData       = new FileReader();
                        fileData.onloadend = handleFile;
                        fileData.readAsDataURL(data)
                    })

                } else {
                    await this.props.formModify({[event.target.name]: [""]}, this.props.nameForm)
                    await this.props.formPropsModify({[event.target.name]: {filesContent: []}}, this.props.nameForm)

                }
                this.props.formValue[event.target.name][0] === "" && this.props.formProps[event.target.name]["required"]
                    ?
                    await this.props.formPropsModify({[event.target.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[event.target.name]: {error: false}}, this.props.nameForm);

                break;

            default:
                await this.props.formModify({[event.target.name]: event.target.value}, this.props.nameForm);
                this.props.formValue[event.target.name] === "" && this.props.formProps[event.target.name]["required"]
                    ?
                    await this.props.formPropsModify({[event.target.name]: {error: true}}, this.props.nameForm)
                    :
                    await this.props.formPropsModify({[event.target.name]: {error: false}}, this.props.nameForm);
                break
        }
    }

    // click event
    handClick = async (event) => {
        event.persist();
        switch (event.target.type) {
            case "file":
                let name = event.target.name
                window.addEventListener("focus", async () => {
                    setTimeout(async () => {
                        // we wait that the window will be focus to update the touch props
                        await this.props.formPropsModify({[name]: {touch: true}}, this.props.nameForm);
                    }, 500)

                });
                break;
            default:
                break

        }
    };

    // blur event
    handBlur = async (event) => {
        event.persist();
        switch (event.target.type) {

            case "text":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "email":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "number":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "tel":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "password":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "radio":
                break;
            case "big_text":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            case "select-one":
                await this.props.formPropsModify({[event.target.name]: {touch: true}}, this.props.nameForm);
                break;
            default:
                break

        }
    };

    handSubmit = (event) => {
        event.preventDefault();
        this.props.formSend(this.props.nameForm)
    };

    handKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handSubmit(event)
        } else {
            this.handleChange(event)
        }
    };


    render() {
        let classNames;
        this.props.attemptingResponse ? classNames = "ui Form segment" : classNames = "Form";
        return (
            <form
                className={classNames}
                onSubmit={this.handSubmit}
                onKeyPress={this.handKeyPress}
            >

                {this.renderInput(this.props.formField)}
                {this.renderResponseMessageError()}
                <Button
                    formField={this.props.formField}
                    buttonField={this.props.buttonField}
                    nameForm={this.props.nameForm}
                    formSend={this.handSubmit}
                />
            </form>
        )

    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        nameForm            : ownProps.nameForm,
        formValue           : state.formValue[ownProps.nameForm],
        formProps           : state.formProps[ownProps.nameForm],
        displayError        : state.displayError[ownProps.nameForm],
        responseErrorMessage: state.responseErrorMessage[ownProps.nameForm],
        formField           : ownProps.formField[ownProps.nameForm],
        buttonField         : ownProps.buttonField[ownProps.nameForm],
    }

};
export default connect(
    mapStateToProps, {
        formModify,
        radioModify,
        formPropsInitialize,
        formPropsRadioInitialize,
        formPropsModify,
        formPropsRadioModify,
        formPropsRadioModifyProperty,
        errorStatue,
        formSend,
        setResponseMessageError
    }
)(Form)
