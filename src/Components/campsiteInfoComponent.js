import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {Link} from "react-router-dom"

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
                <div className = "row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div/>;
}



class CommentForm extends Component{
    render(){
        return(
            <Button onClick={this.handleSubmitComment}>
                Submit Comment
            </Button>
        )
    }
}

export default CampsiteInfo;