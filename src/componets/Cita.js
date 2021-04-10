import React from 'react';


const Time = ({time, eliminartime}) => {
    return (  
        <div className = "time">
            <p>Time: <span>{time.hour}</span></p>
            <p>UTC: <span>{time.count}</span></p>
           
            <button
            className = "button eliminar w-100"
            onClick = {() => eliminartime(time.id)}
            >Eliminar &times;</button>
        </div>
    );
}
 
export default Time;