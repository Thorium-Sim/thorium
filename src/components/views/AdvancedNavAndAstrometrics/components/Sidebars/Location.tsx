import React from 'react';
import "./sidebar.css"
import { MapBorder, PointOfInterest, PointOfInterestInformation } from 'containers/FlightDirector/FlightSets/types';
import { isMapBorder } from '../../helpers';
export type LocationSidebarProps = {
    location: PointOfInterest | MapBorder;

}

export function generateInformationParagraph(information: PointOfInterestInformation) {
    return (
        <>
            {information.hasBasicInformation && <p>{information.basicInformation}</p>}
            {information.hasDetailedInformation && <p>{information.detailedInformation}</p>}
            {information.hasSecretInformation && <p>{information.secretInformation}</p>}
            {(!information.hasBasicInformation && information.basicInformation) || (!information.hasDetailedInformation && information.detailedInformation) || (!information.hasSecretInformation && information.secretInformation) ?
                <p style={{ alignSelf: 'flex-start' }}>Additional information can be gained by visiting this location or by sending a probe to investigate</p> : <></>}
        </>
    )
}

export const LocationSidebar: React.FC<LocationSidebarProps> = (props) => {

    const locationImageUrl = React.useMemo(() => {
        if (props.location && !isMapBorder(props.location)) {
            const location: PointOfInterest = props.location as PointOfInterest;
            return location.fullImageUrl;
        }
        else if (props.location) {
            return (props.location as MapBorder).iconUrl;
        }
        else {
            return '';
        }
    }, [props.location])

    return (
        <div className={"sidebar-parent"}>
            <div className='group-parent'>
                <label className='label'>Location</label>
                <div className='grouping'>
                    {props.location.name}
                </div>
            </div>
            <div className='group-parent' style={{ flexGrow: 1 }}>
                <label className='label'>Location information</label>
                <div className='grouping' style={{ flexGrow: 1, overflow: "auto" }}>
                    <img style={{ width: "100%" }} src={locationImageUrl} />
                    {props.location && !isMapBorder(props.location) && <div className="location-sidebar-information">
                        <p style={{ marginLeft: "0px" }} className='location-sidebar-data'>Location information:</p>
                        {generateInformationParagraph((props.location as PointOfInterest).information)}
                    </div>}
                </div>
            </div>

        </div>
    )

}
