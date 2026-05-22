import React from 'react';
import styles from './styles.module.css'

export type SelectableListViewItemProps = {
    imgUrl: string;
    name: string;
    isSelected: boolean;
    isInvalid?: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}


export const SelectableListViewItem: React.FC<SelectableListViewItemProps> = (props) => {
    const imageHeight = "110px";

    return (
        <div
            onClick={() => !props.isInvalid && props.onClick()}
            className={`${styles['selectable-list-item']} ${props.isSelected && !props.isInvalid && styles['selected']} ${props.isInvalid && styles['invalid']}`}
        >
            <div style={{ width: imageHeight, height: imageHeight }}>
                <img draggable={"false"} style={{ height: '100%' }} src={props.imgUrl} alt={props.name} />
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 'larger', fontWeight: 'bolder' }}>{props.name}</div>
                {props.isInvalid
                    ? <div style={{ color: '#ff6b6b', fontStyle: 'italic' }}>Invalid location</div>
                    : props.children
                }
            </div>
        </div>
    )
}