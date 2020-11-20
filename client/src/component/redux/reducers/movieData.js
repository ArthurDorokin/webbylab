const initialState = {
    movieData: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_MOVIE_REQUEST":
            return {
                ...state
            }
        case "FETCH_MOVIE_SUCCESS":
            return {
                ...state,
                movieData: action.payload
            };
        case "FETCH_MOVIE_FAILURE":
            return {
                ...state,
                error: action.payload
            }
        case "SET_FILTER":
            return {
                ...state,
                movieData: state.movieData.sort((a, b) => a.Title > b.Title ? 1: -1)
            }
        case "SET_SEARCH":
            return {
                ...state,
                movieData: state.movieData.filter(item => item.Title.toLowerCase().includes(action.payload.toLowerCase()))
            }
        case "SET_RESET":
            return {
                ...state,
                movieData: state.movieData.sort((a, b) => a.id > b.id ? 1 : -1)
            }
        default:
            return state;
    }
};

