import React from 'react';

const ResultRenderer = (props) => {
    return ( 
    <div>    
        {props.image_url ?
        <div key='image' className='image'>
            <img src={props.image_url} alt="profile=pic" />
        </div>
        :
        null
        }
            <div key='content' className='content'>
                {props.username && <div className='title'>{ props.username }</div>}
                {props.first_name && <div className='description'>{ props.first_name } { props.last_name }</div>}
            </div>   
    </div> 
    );
}
 
export default ResultRenderer;