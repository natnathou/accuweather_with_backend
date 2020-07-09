import React from 'react'
import {connect} from 'react-redux'
import {Header, Button, Icon, Modal} from 'semantic-ui-react'
import {displayModal} from '../../actions/actions'

// Modal component to display error message
const ModalBasicExample = ({error, displayModal}) => {
    if (error.status) {
        return (
            <Modal open={true} size='small'>
                <Header icon='hand point right' content='Their are an error!'/>
                <Modal.Content>
                    <p>
                        {error['message']}
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='teal' onClick={e => displayModal(false, '')}>
                        <Icon name='checkmark'/> Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    } else {
        return null
    }
};


const mapStateToProps = state => {
    return {error: state.error}
};
export default connect(
    mapStateToProps, {displayModal}
)(ModalBasicExample);
