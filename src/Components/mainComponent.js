import React, { Component } from 'react';
import {CAMPSITES} from '../shared/campsites'
import {COMMENTS} from '../shared/comments'
import {PARTNERS} from '../shared/partners'
import {PROMOTIONS} from '../shared/promotions'
import {Switch, Route, Redirect} from 'react-router-dom'
import ContactInfo from './contactInfoComponent'
import Directory from './directoryComponent';
import Header from './headerComponent'
import Footer from './footerComponent'
import Home from './homeComponent'
import CampsiteInfo from './campsiteInfoComponent'
import AboutUs from './aboutUsComponent'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        campsites: CAMPSITES,
        comments: COMMENTS,
        partners: PARTNERS,
        promotions: PROMOTIONS
    };
}

CampsiteWithId = ({match}) => {
    return (
        <CampsiteInfo 
            campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
            comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
        />
    );
};  


    render() {
        const HomePage = () =>{
            return(
            <Home
            campsites = {this.state.campsites.filter(campsite=> campsite.featured)[0]}
            partners = {this.state.partners.filter(partner=> partner.featured)[0]}
            promotions = {this.state.promotions.filter(promotion=> promotion.featured)[0]}
            />
            )
        }
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route path='/directory/:campsiteId' component={this.CampsiteWithId} />
                    <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
                    <Route path='/aboutus' render={()=> <AboutUs partners={this.state.partners}/>}/>
                    <Route exact path='/contactus' component={ContactInfo} />
                    {/* <Redirect to='/home' /> */}
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;