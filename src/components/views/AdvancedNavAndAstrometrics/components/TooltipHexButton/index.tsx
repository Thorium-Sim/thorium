import React from "react";
import { HexButton } from "../HexButton";
import { Popover, PopoverBody, PopoverHeader } from "reactstrap";

export type TooltipHexButtonProps = {
    id: string;
    children?: any
    tooltipHeader: any
    tooltipBody: any
    size?: 'small' | 'large'
}

export const TooltipHexButton: React.FC<TooltipHexButtonProps> = (props) => {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);

    return <HexButton selected={popoverOpen} id={props.id} size={props.size}>
        {props.children}
        <Popover trigger="legacy" placement="top" isOpen={popoverOpen} target={props.id} toggle={toggle}>
            <PopoverHeader style={{ fontSize: 'smaller', backgroundColor: '#00000055' }}>{props.tooltipHeader}</PopoverHeader>
            <PopoverBody>
                {props.tooltipBody}
            </PopoverBody>
        </Popover>
    </HexButton>
}