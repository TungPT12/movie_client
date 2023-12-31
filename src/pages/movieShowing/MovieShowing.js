import React, { useEffect, useState } from 'react';
import styles from './MovieShowing.module.css'
import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getMoviesShowingApi } from '../../services/apis/movie-service-api';

function MovieShowing() {

    const [moviesShowing, setMoviesShowing] = useState([]);

    const getMoviesShowing = () => {
        getMoviesShowingApi().then((response) => {
            if (response.status !== 200) {
                throw new Error("Something wrong");
            }
            return response.data
        }).then((data) => {
            // console.log(data)
            setMoviesShowing(data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getMoviesShowing()
    }, [])


    const renderMoviesShowing = (moviesShowing) => {
        return moviesShowing.map((movieShowing) => {
            console.log(movieShowing)
            return <div key={movieShowing.movie.id} className={`bg-light w-100 ${styles['wrap-item']}`} >
                <div>
                    <img className={`w-100 ${styles['']}`} alt={movieShowing.movie.title ? movieShowing.movie.title : movieShowing.movie.name} src={`https://image.tmdb.org/t/p/original${movieShowing.movie.poster_path}`} />
                </div>
                <div className={`d-flex w-100 ${styles['wrapper-info']}`}>
                    <div className={`mb-0 ${styles['name']} px-1`}>{movieShowing.movie.title ? movieShowing.movie.title : movieShowing.movie.name}</div>
                    <p className={`mb-0 f-1 ${styles['vote']} d-flex align-items-center`}>
                        <FontAwesomeIcon icon={faStar} className={`${styles['icon-star']} p-1`} />
                        <span>{movieShowing.movie.vote_average}</span>
                    </p>
                </div>
                <div className={`w-100 d-flex align-items-center justify-content-center py-2`}>
                    <Link to={`/movie-showing/${movieShowing._id}`} className={`text-decoration-none  text-center ${styles['link-book-ticket']}`}>Buy Ticket</Link>
                </div>
            </div>
        })
    }


    return (
        <>
            <div className={`${styles['navbar']} px-3 py-2 align-items-center w-100 d-flex justify-content-between`}>
                <div className='d-flex align-items-center justify-content-between'>
                    <Link to='/' className={`${styles['logo']}`}><h2 className={`${styles['logo']}`}>Movie App</h2></Link>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-center'>
                <div className={`${styles['movie-showing']} d-grid w-75`}>
                    {renderMoviesShowing(moviesShowing)}
                </div>
            </div>
        </>
    );
}

export default MovieShowing;