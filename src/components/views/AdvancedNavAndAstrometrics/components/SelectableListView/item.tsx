import React from 'react';
import styles from './styles.module.css'

export type SelectableListViewItemProps = {
    imgUrl: string;
    name: string;
    isSelected: boolean;
    onClick: () => void;
    children?: React.ReactNode;
}


export const SelectableListViewItem: React.FC<SelectableListViewItemProps> = (props) => {
    const imageHeight = "110px";

    return (
        <div onClick={() => props.onClick()} className={`${styles['selectable-list-item']} ${props.isSelected && styles['selected']}`}>
            <div style={{ width: imageHeight, height: imageHeight }}>
                <img draggable={"false"} style={{ height: '100%' }} src={props.imgUrl} alt={props.name} />
            </div>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 'larger', fontWeight: 'bolder' }}>{props.name}</div>
                {props.children}
            </div>
        </div>
    )
}