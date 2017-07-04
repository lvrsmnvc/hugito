import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, FormControl, Col, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';

const dummyHiddenModal = {
    show: 'false',
    title: '',
    fieldNames: [
        {value: ''}
    ],
    closeButton: '',
    saveButton: ''
}

class ModalWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            path: 'content/post',
            fileName: '',
            title: '',
            repository: '',
            projectBranch: 'hugo-project',
            publicBranch: 'master'
        }
    }
    onChange(e){
        if (e.target.id === 'repositories') {
            const repository = e.target.value;
            this.setState({repository});
        } else if (e.target.id === 'publicBranch') {
            const publicBranch = e.target.value;
            this.setState({publicBranch});
        } else if (e.target.id === 'projectBranch') {
            const projectBranch = e.target.value;
            this.setState({projectBranch});
        } else if (e.target.id === 'fileName') {
            // By default md extension is added. In the future more extensions
            // should be supported.
            const fileName = e.target.value + '.md';
            this.setState({fileName});
        } else if (e.target.id === 'title') {
            const title = e.target.value;
            this.setState({title});
        }
    }
    onSave(){
        const {fileName, path, title, repository, publicBranch, projectBranch} = this.state;
        const {modal, validateRepository, createContent} = this.props;
        if (modal.type === 'addRepository') {
            const branches = {
                publicBranch: publicBranch,
                projectBranch: projectBranch
            }
            validateRepository(repository, branches);
            this.onHide();
        } else if(modal.type === 'createContent') {
            createContent(fileName, title, path);
            this.onHide();
        }
    }
    onHide(){
        this.props.setModal(dummyHiddenModal);
    }
    render() {
        const {modal} = this.props;
        const show = (modal.show === 'true');
        return(
            <Modal
                show={show}
                onHide={this.onHide.bind(this)}
                dialogClassName='custom-modal'
            >
                <ModalHeader closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </ModalHeader>
                <ModalBody>{
                    modal.fieldNames.map( field =>{
                        return (
                            <div key={field.value}>
                                <Form horizontal>
                                    <FormGroup controlId='formHorizontalText'>
                                      <Col componentClass={ControlLabel} sm={3}>
                                        {field.value}
                                      </Col>
                                      <Col sm={9}><FormControl id={field.type} type='text' placeholder={field.placeholder} onChange={this.onChange.bind(this)} defaultValue={field.default}/>
                                      </Col>
                                    </FormGroup>
                                </Form>
                            </div>
                        )
                    })
                }</ModalBody>
                <ModalFooter>
                    <Button onClick={this.onHide.bind(this)}>{modal.closeButton}</Button>
                    <Button onClick={this.onSave.bind(this)} bsStyle='primary'>{modal.saveButton}</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

ModalWrapper.propTypes = {
    modal: React.PropTypes.object.isRequired,
    setModal: React.PropTypes.func.isRequired,
    createContent: React.PropTypes.func.isRequired,
    validateRepository: React.PropTypes.func.isRequired
}

export default ModalWrapper
