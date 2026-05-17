import React, { useMemo } from 'react';
import { SelectableListViewItem } from './item';
import { ScrollableList } from '../ScrollableList';

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
    isInvalid?: boolean;
}

export const SelectableListView: React.FC<SelectableListViewProps> = (props) => {
    const visualArray = useMemo(() => {
        const items: React.ReactNode[] = [];
        props.options.forEach((each) => {
            items.push(
                <SelectableListViewItem
                    isSelected={props.selectedOption === each.id}
                    isInvalid={each.isInvalid}
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
        <ScrollableList
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: '5px', alignContent: 'flex-start' }}
            scrollAmount={270}
        >
            {visualArray}
        </ScrollableList>
    )
}