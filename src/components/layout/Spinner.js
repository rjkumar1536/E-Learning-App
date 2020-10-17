import React, {Fragment} from 'react';
import spinner from '../../img/loading-png-gif.gif'

const Spinner = () => {
    return (
        <Fragment>
            <img src = {spinner} alt = "Loading..." style = {{width : '200px', margin : 'auto', display : 'block', alt : 'Loading...'}}/>
        </Fragment>
    )
}

export default Spinner;