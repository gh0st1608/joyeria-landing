import React, { Component } from 'react';





import PriceRange from './RangoPrecio';


// Color selection
const colorposts = [
    { name: 'Red' },
    { name: 'Green' },
    { name: 'Brown' },
    { name: 'Grey' },
    { name: 'Orange' },
];


class Shopsidebar extends Component {
    render() {
        return (
            <div className="sidebar">

                <div className="widget search-widget mb-40">
                    <h5 className="widget-title">Search Objects</h5>
                    <form action="#">
                        <input type="text" placeholder="Search your keyword..." />
                        <button type="submit"><i className="far fa-search" /></button>
                    </form>
                </div>

                <div className="widget socail-widget mb-40">
                    <h5 className="widget-title">Precio</h5>
                    <PriceRange />
                </div>


                {/* Color Widget */}
                <div className="widget socail-widget mb-40">
                    <h5 className="widget-title">Color</h5>
                    <div className="filter-color">
                        <form>
                            {colorposts.map((item, i) => (
                                <label key={i} className="checkbox">
                                    <input type="checkbox" name="#" />
                                    <span className="custom-box" />
                                    {item.name}
                                </label>
                            ))}
                        </form>
                    </div>
                </div>
                       
            </div>
        );
    }
}


export default Shopsidebar;