export const setFilter = () => ({
    type: 'SET_FILTER'
});

export const setSearch = search => ({
    type: 'SET_SEARCH',
    payload: search
});

export const takeMoviePush = movie => ({
    type: 'TAKE_MOVIE_PUSH',
    payload: movie
});