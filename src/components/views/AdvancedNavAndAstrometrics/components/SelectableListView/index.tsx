import React, { useMemo } from 'react';
import { SelectableListViewItem } from './item';

export type SelectableListViewProps = {
    selectedOption?: string;
    options: SelectableListViewOption[];
    onOptionSelected: (optionId: string) => void;
}

export type SelectableListViewOption = {
    id: string
    title: string;
    description: React.ReactNode;
    imageUrl: string;
}

export const SelectableListView: React.FC<SelectableListViewProps> = (props) => {
    const visualArray = useMemo(() => {
        const items: React.ReactNode[] = [];
        props.options.forEach((each) => {
            items.push(
                <SelectableListViewItem
                    isSelected={props.selectedOption === each.id}
                    onClick={() => props.onOptionSelected(props.selectedOption === each.id ? "" : each.id)}
                    key={each.id}
                    imgUrl={each.imageUrl}
                    name={each.title}>
                    {each.description}
                </SelectableListViewItem>
            )
        })
        return items;
    }, [props])
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: "5px", overflow: "auto" }}>
            {visualArray}
        </div>
    )
}