type hasSortOrder = { sortOrder: number };

function sortByOrder<T extends hasSortOrder>(a: T, b: T) {
    return a.sortOrder - b.sortOrder;
}

export default sortByOrder;
