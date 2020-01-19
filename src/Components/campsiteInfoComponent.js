import React, { Component, useState } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, Label, Col,Row, Input} from 'reactstrap';
import { Link } from "react-router-dom"
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);

function RenderCampsite({ campsite }) {
    if (campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                {comments.map(x => {
                    return (
                        <div key={x.id}>
                            <div>
                                Rating: {x.rating}
                            </div>
                            <div>
                                text: {x.text}
                            </div>
                            <div>
                                author: {x.author}
                            </div>
                            <div>
                                date: {x.date}
                            </div>
                            <hr />
                        </div>
                    )
                })}
                <CommentForm />
            </div>
        )
    }
    else {
        return (
            <div />
        )
    }
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

class CommentForm extends Component {

    handleSubmit = (values) => {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {

        const ModalExample = () => {

            const [modal, setModal] = useState(false);

            const toggle = () => setModal(!modal);

            return (
                <div>
                    <Button color="secondary" onClick={toggle}>Comment</Button>
                    <Modal isOpen={modal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                        toggle={toggle} className="">
                        <ModalHeader toggle={toggle}>Review</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label for="exampleName" sm={2}>Name</Label>
                                    <Col sm={10}>
                                    <Control.text model=".firstName" id="exampleName" name="firstName"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstName"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="exampleSelect" sm={2}>Rating</Label>
                                    <Col sm={10}>
                                        <Input type="select" name="select" id="exampleSelect">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Input>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label for="exampleText" sm={2}>Comments</Label>
                                    <Col sm={10}>
                                        <Input type="textarea" name="text" id="exampleText" />
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" onClick={toggle}>Submit</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            );
        }

        //   main return for CommentForm
        return (
            <>
                <ModalExample />
            </>
        )
    }
}




export default (CampsiteInfo);