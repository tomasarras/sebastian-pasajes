import React from "react";

export default function CommonInput(props) {

    return(
        <>
            <input className={`${props.inputClassName} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`} 
                type={props.type} 
                onKeyDown={props.onKeyDown}
                placeholder={props.placeholder} 
                onChange={props.onChange}
                value={props.value}
                name={props.name}
            />
            {props.isInvalid && 
                <div className="text-red-500">{props.invalidMessage}</div>
            }
        </>
    );
} 