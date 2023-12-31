import React, { useCallback, useEffect, useState } from 'react';
import styles from './BookTicket.module.css'
import Chair from '../../components/Chair/Chair';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createOrder, getMoviesShowingBydIdApi } from '../../services/apis/movie-service-api';
import formatPrice from '../../utils/FormatPrice';
import { format } from "date-fns";

function BookTicket() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movieShowingDetail, setMovieShowingDetail] = useState({
        _id: "",
        movie: {
            adult: false,
            id: 361743,
            title: "",
            overview: "",
            poster_path: "",
        },
        date: new Date(),
        price: 0,
        times: [
            {
                time: "",
                chairs: []
            }
        ],
    });

    const [chairsBooking, setChairsBooking] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [date, setDate] = useState(0)
    const [time, setTime] = useState('')
    const [chairs, setChairs] = useState([])
    const [chairsChose, setChairsChose] = useState([])
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")


    const getMovieShowingDetail = (id) => {
        getMoviesShowingBydIdApi(id).then((response) => {
            if (response.status !== 200) {
                throw new Error("Something wrong");
            }
            return response.data
        }).then((data) => {
            console.log(data)
            setMovieShowingDetail(data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getMovieShowingDetail(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderChairs = (chairs) => {
        return chairs.map((chair) => {
            return <Chair setChairsChose={setChairsChose} setTotalPrice={setTotalPrice} price={movieShowingDetail.price} totalPrice={totalPrice}
                chairsChose={chairsChose} title={chair.title} isBooked={chair.isBooked} choose={false} />
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    const setNewTime = (time) => {
        setTime(time.time)
        setTimeout(() => {
            setChairs([...time.chairs]);
        }, 1000);
        setChairsChose([])
    }

    const renderTimes = (times) => {
        return times.map((time) => {
            return <div onClick={() => {
                setChairs([])
                setNewTime(time)
            }} className={`${styles['time']}`}>
                {time.time}
            </div>
        })
    }

    const bookTicket = () => {
        const ticket = {
            movieShowingId: id,
            date: date,
            time: time,
            totalPrice: totalPrice,
            email: email,
            phone: phone,
            chairs: chairsChose
        }
        createOrder(ticket).then((response) => {
            if (response.status !== 200) {
                throw new Error("Something wrong");
            }
            return response.data
        }).then((data) => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <div className={`${styles['navbar']} px-3 py-2 align-items-center w-100 d-flex justify-content-between`}>
                <div className='d-flex align-items-center justify-content-between'>
                    <Link to='/' className={`${styles['logo']}`}><h2 className={`${styles['logo']}`}>Movie App</h2></Link>
                </div>
            </div>
            <div className={`${styles['movie-detail']} pb-5`}>
                <div className={`d-flex ${styles['movie-info']} mt-3 bg-light`}>
                    <div className={`${styles['img']} me-4`}>
                        <img alt={`${movieShowingDetail.movie.title ? movieShowingDetail.movie.title : movieShowingDetail.movie.name}`} className={`w-100`} src={`https://image.tmdb.org/t/p/original${movieShowingDetail.movie.poster_path}`} />
                    </div>
                    <div className={`${styles['right-movie-info']} px-2`}>
                        <div className={`${styles['warrper-header-movie-info']} d-flex justify-content-between`}>
                            <div className={`${styles['movie-name']}`}>{movieShowingDetail.movie.title ? movieShowingDetail.movie.title : movieShowingDetail.movie.name}</div>
                        </div>
                        <div>
                            <span className={`${styles['price-title']}`}>Price</span>: {formatPrice(movieShowingDetail.price.toString())} VND
                        </div>
                        <div className={`${styles['overview']}`}>
                            <p>{movieShowingDetail.movie.overview}</p>
                        </div>
                        <div className={`d-grid ${styles['date-showing']}`}>
                            <div onClick={() => {
                                setDate(movieShowingDetail.date)
                            }} className={`${styles['date']}`}>
                                {format(movieShowingDetail.date, "dd-MM-yyyy")}
                            </div>
                        </div>
                        <div className={`${styles['time-showing']} d-grid`}>
                            {
                                date ? renderTimes(movieShowingDetail.times) : ""
                            }
                        </div>
                    </div>
                </div>
                <div className='flex w-100 justify-content-center align-items-center mt-4'>
                    <div className='text-light d-flex justify-content-center'>
                        <div className={`${styles['screen']} w-50 mb-3 text-black text-center`}>
                            Screen
                        </div>
                    </div>

                    <div className={`d-flex justify-content-center mb-5 text-white`}>
                        <div className='me-5 d-flex align-items-center'>
                            <Chair />
                            <span className='ms-2'>Not Booking</span>
                        </div>
                        <div className={`me-5 d-flex align-items-center`}>
                            <Chair isBooked={true} />
                            <span className='ms-2'>Booked</span>
                        </div>
                        <div className={`d-flex align-items-center`}>
                            <Chair choose={true} />
                            <span className='ms-2'>Chose</span>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className={`${styles['row-chair']} mb-3`}>
                            {
                                time ? renderChairs(chairs) : ""
                            }
                        </div>
                    </div>
                    {
                        chairsChose.length > 0 ? <div className="d-flex justify-content-center">
                            <div className="bg-light w-75 d-flex flex-column justify-content-center align-items-center px-3 py-3">
                                <div className='justify-content-between d-flex'>
                                    <form className={`${styles['form-book']}  flex-column w-50 p-2`}>
                                        <input onChange={(e) => {
                                            setEmail(e.target.value);
                                        }} className={`${styles['input']}`} placeholder="email" />
                                        <input onChange={(e) => {
                                            setPhone(e.target.value);
                                        }} className={`${styles['input']}`} placeholder="phone" />
                                    </form>
                                    <div className='bg-light ms-2'>
                                        <div>
                                            <span>Movie name: </span> Top Gun
                                        </div>
                                        <div>
                                            <span>Date - time: </span> {format(date, "dd-MM-yyyy")} {time}
                                        </div>
                                        <div>
                                            <span>Chairs: </span> {chairsChose.join(', ')}

                                        </div>
                                        <div>
                                            <span>Total price: </span> {formatPrice(totalPrice.toString())}
                                        </div>
                                    </div>
                                </div>
                                <button onClick={bookTicket} className={`${styles['btn-book-ticket']}`}>Book Ticket</button>
                            </div>
                        </div> : <></>
                    }
                </div>
            </div >
        </div>
    );
}

export default BookTicket;
