import React, { Component } from 'react';
import {CAMPSITES} from '../shared/campsites'
import CAMPSITEINFO from './campsiteInfoComponent'
import Directory from './directoryComponent';
import Header from './headerComponent'
import Footer from './footerComponent'


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
        campsites: CAMPSITES,
        selectedCampsite: null
    };
}

onCampsiteSelect(campsiteID) {
    this.setState({selectedCampsite: campsiteID});
}

    render() {
        return (
            <div>
                <Header/>
                <Directory campsites={this.state.campsites} onClick = {campsiteID => this.onCampsiteSelect(campsiteID)}/>
                <CAMPSITEINFO campsite = {this.state.campsites.filter(campsite=> campsite.id === this.state.selectedCampsite)[0]}/>
                <Footer/>
            </div>
        );
    }
}

export default Main;