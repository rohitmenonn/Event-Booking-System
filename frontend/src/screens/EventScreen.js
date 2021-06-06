import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listEventDetails,
  createEventReview,
} from '../actions/eventActions'
import { EVENT_CREATE_REVIEW_RESET } from '../constants/eventConstants'

const EventScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const eventDetails = useSelector((state) => state.eventDetails)
  const { loading, error, event } = eventDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const eventReviewCreate = useSelector((state) => state.eventReviewCreate)
  const {
    success: successEventReview,
    loading: loadingEventReview,
    error: errorEventReview,
  } = eventReviewCreate

  useEffect(() => {
    if (successEventReview) {
      setRating(0)
      setComment('')
    }
    if (!event._id || event._id !== match.params.id) {
      dispatch(listEventDetails(match.params.id))
      dispatch({ type: EVENT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successEventReview, event._id])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createEventReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  const dateString = '2021-05-08'

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={event.name} />
          <Row className="fw-custom">
            <Col md={6}>
              <Image src={event.image} alt={event.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3 className="event-name">{event.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={event.rating}
                    text={`${event.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${event.price}</ListGroup.Item>
                <ListGroup.Item>Venue: {event.venue}</ListGroup.Item>
                <ListGroup.Item>Date: {dateString}</ListGroup.Item>
                <ListGroup.Item className="event-description">
                  Description: {event.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>

                  <ListGroup.Item>
                    <Row>
                      <Col>Date:</Col>
                      <Col>
                        {dateString}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {event.tickets > 0 ? 'Available' : 'Not Available'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {event.tickets > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Tickets</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(event.tickets).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={event.tickets === 0}
                    >
                      Book Event
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="reviews">
              <h2>Reviews</h2>
              {event.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {event.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="ml-custom">
                  <h2 className="headings">Write a Review</h2>
                  {successEventReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingEventReview && <Loader />}
                  {errorEventReview && (
                    <Message variant='danger'>{errorEventReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingEventReview}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default EventScreen
