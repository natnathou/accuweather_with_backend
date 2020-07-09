import React                       from 'react'
import {connect}                   from 'react-redux'
import {searchBarInput,searchCity,fetchItemDisplay,resetSearchBarInput,resetSearchCity,fetchPosition} from '../../../../actions/actions'

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.RefButton       = React.createRef()
        this.RefIconPosition = React.createRef()
    }

    handleClick= (event)=>{
        this.props.searchCity(this.props.valueSearchBar)
    }
    handleChange= async (event)=>{
        await this.props.searchBarInput(event.target.value)
        this.props.searchCity(this.props.valueSearchBar)
    }
    handleSubmit=(event)=>{
        event.preventDefault()
    }

    renderList=()=>{
        // to avoid error we check if this.RefIconPosition.current && this.RefButton.current are true
        if(this.props.listResultSearchCity[0] && this.RefIconPosition.current && this.RefButton.current){
            let widthIconPosition = this.RefIconPosition.current.clientWidth
            let widthButton       = this.RefButton.current.clientWidth
            return(
                <div 
                    role="list" 
                    className="ui selection middle aligned list" 
                    style={{paddingLeft: `${widthIconPosition}px`, paddingRight: `${widthButton}px` }}
                >
                    {this.props.listResultSearchCity.map(
                        data => {
                            return (
                                <div role      = "listitem"
                                     className = "item renderList"
                                     key       = {data.Key}
                                     onClick   = {async e=>{
                                        await this.props.resetSearchBarInput()
                                        await this.props.resetSearchCity()
                                        this.props.fetchItemDisplay(data.Key,data.LocalizedName)
                                         
                                     }}
                                    >
                                    <div className = "content">
                                        {data.LocalizedName}
                                    </div>
                                </div>
                            );
                    })}
                </div>  
            )
        }
        
    }

    render(){        
        return(
            <form 
            className = "ui form" 
            onSubmit = {this.handleSubmit} 
            style={{paddingTop: `50px`}}
            >
                <div  className = "field">
                    <div  className = "ui input labeled action">
                        <div  ref={this.RefIconPosition} className = "ui label" onClick={e=>this.props.fetchPosition()}>
                            <i
                                className = "location arrow icon"
                                style     = {{margin: `auto`}}
                                >
                            </i>
                        </div>                        
                        <input 
                            type        = "text"
                            placeholder = "Enter your city"
                            value       = {this.props.valueSearchBar}
                            onChange    = {this.handleChange}
                            onClick     = {this.handleClick}
                            />
                        <button ref = {this.RefButton} className = "ui button teal">
                            search
                        </button>                       
                                    
                    </div>
                </div>
                {this.renderList()}
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        valueSearchBar      : state.valueSearchBar,
        listResultSearchCity: state.listResultSearchCity

    }
};
export default connect(
    mapStateToProps, {searchBarInput,searchCity,fetchItemDisplay,resetSearchBarInput,resetSearchCity,fetchPosition}
)(SearchBar);
