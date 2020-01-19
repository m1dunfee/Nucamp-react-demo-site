import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ContactInfo from './contactInfoComponent'
import Directory from './directoryComponent';
import Header from './headerComponent'
import Footer from './footerComponent'
import Home from './homeComponent'
import AboutUs from './aboutUsComponent'
import CampsiteInfo from './campsiteInfoComponent'


const mapReduxStateToProps = state =>{
    return{
        campsites: state.campsites,
        comments: state.comments,
        promotions: state.promotions,
        partners: state.partners

    }
}


class Main extends Component {
    render() {
        const HomePage = () =>{
            return(
            <Home
            campsites = {this.props.campsites.filter(campsite=> campsite.featured)[0]}
            partners = {this.props.partners.filter(partner=> partner.featured)[0]}
            promotions = {this.props.promotions.filter(promotion=> promotion.featured)[0]}
            />
            )
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
                  comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)} />
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    <Route path='/aboutus' render={()=> <AboutUs partners={this.props.partners}/>}/>
                    <Route exact path='/contactus' component={ContactInfo} />
                    {/* <Redirect to='/home' /> */}
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(connect(mapReduxStateToProps)(Main));