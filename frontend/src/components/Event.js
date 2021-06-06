import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Event = ({ event }) => {
  return (
    <Card className='my-3 p-3 rounded event-card'>
      <Link to={`/event/${event._id}`}>
        <Card.Img src={event.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/event/${event._id}`}>
          <Card.Title as='div' className="card-title">
            {event.name}
          </Card.Title>
        </Link>

        <Card.Text className="card-category">{event.category}</Card.Text>
        <Card.Text className="card-category">2021-05-08</Card.Text>

        <Card.Text as='div' className="card-review">
          <Rating
            value={event.rating}
            text={`${event.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3' className="card-price">${event.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Event
