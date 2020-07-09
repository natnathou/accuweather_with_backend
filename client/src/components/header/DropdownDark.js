import React from "react"
import {connect} from "react-redux"
import {setMetricOrImperial, setModeDarkOrLight} from "../../actions/actions"

class DropdownDark extends React.Component {
    renderDropdown = () => {
        if (this.props.modeLightOrDark) {
            return <select
                className="ui dropdown menu dropdownMenu"
                value={this.props.modeLightOrDark}
                onChange={this.handleChange}>
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
            </select>
        }
    };

    handleChange = async (event) => {
        await this.props.setModeDarkOrLight(event.target.value);
        //we add a className to body to change to the theme dark
        document.getElementsByTagName("body")[0].className = `${this.props.modeLightOrDark}`

    };

    render() {
        return <div className="item">
            {this.renderDropdown()}
        </div>
    }
}


const mapStateToProps = state => {
    return {
        modeLightOrDark: state.modeLightOrDark
    }
};
export default connect(
    mapStateToProps, {setMetricOrImperial, setModeDarkOrLight}
)(DropdownDark)
