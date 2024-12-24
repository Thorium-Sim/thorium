import React from 'react'
import "./location-sidebar.css"

export const BlankSidebar = () => {
    return (
        <div className={`location-sidebar open`}>
            <div className="location-sidebar-title">
                <span>Information</span>
            </div>
            <div className="location-sidebar-divider"></div>
            <div className="location-sidebar-data">
                Please select an option for more information
            </div>


        </div>
    )
}