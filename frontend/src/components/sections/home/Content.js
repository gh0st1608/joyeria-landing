import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Category from './Category';
import Video from './Video'; 
import Habout from '../../layouts/Habout';


class Content extends Component {
    render() {
        return (
            <Fragment>
                <Banner/>
                <Category/>
                <Habout/>
                <Video/>
            </Fragment>
        );
    }
}

export default Content;