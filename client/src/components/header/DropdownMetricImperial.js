import React from "react"
import {connect} from "react-redux"
import {setMetricOrImperial} from "../../actions/actions"

class DropdownMetricImperial extends React.Component {
    renderDropdown = () => {
        if (this.props.valueMetricOrImperial) {
            return <select
                className="ui dropdown menu dropdownMenu"
                value={this.props.valueMetricOrImperial}
                onChange={this.handleChange}>
                <option value="C°">C°</option>
                <option value="F°">F°</option>
            </select>
        }
    };

    handleChange = (event) => {
        this.props.setMetricOrImperial(event.target.value)
    };

    render() {
        return <div className="item">
            {this.renderDropdown()}
        </div>
    }
}


const mapStateToProps = state => {
    return {
        valueMetricOrImperial: state.valueMetricOrImperial
    }
};
export default connect(
    mapStateToProps, {setMetricOrImperial}
)(DropdownMetricImperial)
