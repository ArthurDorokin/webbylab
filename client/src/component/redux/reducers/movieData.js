const initialState = {
    movieData: [],
    search:[]
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
            console.log(action)
            return {
                ...state,
                movieData: state.movieData.sort((a, b) => a.Title < b.Title ? 1 : -1)
            }
        case "SET_SEARCH":
            return {
                ...state,
                search: action.payload
            }
        case "TAKE_ID_MOVIE":
            return {
                ...state,
                movieId: action.payload
            }
        case "TAKE_MOVIE_PUSH":
            return {
                ...state,
                movieData: state.movieData.concat(action.payload)
            }
        case "DELETE_PUSH_MOVIE":
            return {
                ...state,
                movieData: state.movieData.filter(item => item._id !== action.payload)
            }
        default:
            return state;
    }
};

