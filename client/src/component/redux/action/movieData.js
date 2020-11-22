import axios from 'axios';

export const fetchMovieRequest = () => ({
    type: "FETCH_MOVIE_REQUEST"
})

export const fetchMovieSuccess = success => ({
    type: "FETCH_MOVIE_SUCCESS",
    payload: success
})

export const fetchMovieFailure = error => ({
    type: "FETCH_MOVIE_FAILURE",
    payload: error
})

export const takeIdMovie = id => ({
    type: "TAKE_ID_MOVIE",
    payload: id
})

export const deleteMoviePush = id => ({
    type: "DELETE_PUSH_MOVIE",
    payload: id
})


export const fetchMovie = () => {
    return (dispatch) => {
        dispatch(fetchMovieRequest)
        axios.get('/api/movies/')
            .then(response => {
                const data = response.data
                dispatch(fetchMovieSuccess(data))
            })
            .catch(error => {
                const errorMsg = error.error.message
                dispatch(fetchMovieFailure(errorMsg))
            })
    }
}


export const importMovie = () => {
    let formData = new FormData();
    let imageFile = document.querySelector('#file');
    formData.append('file', imageFile.files[0]);
    console.log('>> formData >> ', formData);
    axios.post('/api/movies/import',
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).catch((e) => {
        alert(JSON.parse(e.response.request.responseText).message);
    });
}