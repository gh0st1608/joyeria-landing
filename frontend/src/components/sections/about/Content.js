import React, { Component, Fragment } from 'react';
import About from './About';
import Aboutv2 from './Aboutv2';
import Core from './Core';
import Counter from './Counter';
import News from './News';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <Aboutv2/>
                {/* <About/> */}
                {/* <Core/>
                <Counter/>
                <News/> */}
            </Fragment>
        );
    }
}

export default Content;