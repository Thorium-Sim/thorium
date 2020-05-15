import React from "react";

import {Input, ListGroup, ListGroupItem} from "reactstrap";
import {capitalCase} from "change-case";
import matchSorter from "match-sorter";
import "./SearchableList.scss";

interface SearchableListProps {
  items: ListItem[];
  selectedItem?: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string | null>>;
  renderItem?: (item: ListItem) => JSX.Element;
}
interface ListItem {
  id: string;
  label: string;
  category?: string | null;
  [key: string]: any;
}
const SearchableList: React.FC<SearchableListProps> = ({
  items,
  selectedItem,
  setSelectedItem,
  renderItem,
}) => {
  const [search, setSearch] = React.useState<string>("");
  const filteredObjects = React.useMemo(
    () => matchSorter(items, search, {keys: ["label", "category"]}),
    [items, search],
  );
  const sortedIntoCategories = filteredObjects.reduce(
    (prev: {[key: string]: ListItem[]}, next: ListItem) => {
      const cat = next.category || "";
      prev[cat] = prev[cat] || [];
      prev[cat].push(next);
      return prev;
    },
    {},
  );

  return (
    <>
      <Input
        type="search"
        value={search}
        placeholder="Search"
        onChange={e => setSearch(e.target.value)}
      />
      <ListGroup className="searchable-list">
        {Object.entries(sortedIntoCategories)
          .concat()
          .sort(([a], [b]) => {
            if (a > b) return 1;
            if (b > a) return -1;
            return 0;
          })
          .map(([key, items]) => (
            <React.Fragment key={key}>
              {key && (
                <ListGroupItem disabled>{capitalCase(key)}</ListGroupItem>
              )}
              {items.map(c => (
                <ListGroupItem
                  key={c.id}
                  active={c.id === selectedItem}
                  onClick={() => setSelectedItem(c.id)}
                >
                  {renderItem ? renderItem(c) : c.label}
                </ListGroupItem>
              ))}
            </React.Fragment>
          ))}
      </ListGroup>
    </>
  );
};

export default SearchableList;
