import React from 'react';
import CheckMarkIconSVG  from './check-mark.svg';

function CheckMarkIcon(props : any)
{
    if (props["notificationCount"] != 0)
    {
        // return nothing
        return (null);
    }
    else
    {
        return <img
        id="CheckMarkIconID"
        style={{
            display: "flex",
            marginLeft: '50px',
        }}
        src={CheckMarkIconSVG}></img> 
    }
}

export default CheckMarkIcon;