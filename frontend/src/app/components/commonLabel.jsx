import React from "react";

export default function CommonLabel({ children, className = "", ...props}) {

    return(
        <>
            <label {...props} className={`flex flex-col block mb-2 text-sm font-medium text-gray-900 ${className}`}>
                {children}
            </label>
        </>
    );
} 