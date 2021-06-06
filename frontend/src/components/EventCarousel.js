import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopEvents } from '../actions/eventActions'

const EventCarousel = () => {
  const dispatch = useDispatch()

  const eventTopRated = useSelector((state) => state.eventTopRated)
  const { loading, error, events } = eventTopRated

  useEffect(() => {
    dispatch(listTopEvents())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark carousel'>
      {events.map((event) => (
        <Carousel.Item key={event._id}>
          <Link to={`/event/${event._id}`}>
            <Image src={event.image} alt={event.name} fluid className='carousel-image'/>
            <Carousel.Caption className='carousel-caption'>
              <h2 className='carousel-heading'>
                {event.name} (${event.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default EventCarousel
