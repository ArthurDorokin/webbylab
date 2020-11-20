export const setFilter = () => ({
    type: 'SET_FILTER'
});

export const setSearch = search => ({
    type: 'SET_SEARCH',
    payload: search
});

export const setReset = (search) => ({
    type: 'SET_RESET'
});