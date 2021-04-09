import React from 'react';
import ReactLoader from 'react-loader-spinner';

const Loader = props => {
    var width = window.innerWidth 
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    var disableAppStyle =  {
        'position': 'absolute',
        'width': width,
        'height': document.body.scrollHeight,
        'zIndex':'999999999999',
        'background': ' rgba(0,0,0, .2)'
    }

    var loaderPositionStyle = {
        'margin': '0 auto',
        'position': 'absolute',
        'left':(width/2)-50,
        'top':'50vh'
    }

    return props.loader ? (
        <div style={disableAppStyle}>
            <div style={loaderPositionStyle}>
                <ReactLoader 
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            </div>
        </div>
    ):null
}

export default Loader