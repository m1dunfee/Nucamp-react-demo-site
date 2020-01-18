import React, { Component } from 'react';
import {CAMPSITES} from '../shared/campsites'
import {COMMENTS} from '../shared/comments'
import {PARTNERS} from '../shared/partners'
import {PROMOTIONS} from '../shared/promotions'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import ContactInfo from './contactInfoComponent'
import Directory from './directoryComponent';
import Header from './headerComponent'
import Footer from './footerComponent'
import Home from './homeComponent'
import CampsiteInfo from './campsiteInfoComponent'
import AboutUs from './aboutUsComponent'


const mapReduxStateToProps = state =>{
    return{
        campsite: state.campsite,
        comments: state.comments,
        promotion: state.promotion,
        partner: state.partner

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
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/directory/:campsiteId' component={this.CampsiteWithId} />
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