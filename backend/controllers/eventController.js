import asyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Event.countDocuments({ ...keyword })
  const events = await Event.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ events, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    res.json(event)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id)

  if (event) {
    await event.remove()
    res.json({ message: 'Event removed' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const event = new Event({
    name: '-',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    venue: '-',
    category: '-',
    tickets: 0,
    numReviews: 0,
    description: '-',
  })

  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    venue,
    category,
    tickets,
  } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    event.name = name
    event.price = price
    event.description = description
    event.image = image
    event.venue = venue
    event.category = category
    event.ticket = tickets

    const updatedEvent = await event.save()
    res.json(updatedEvent)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createEventReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    const alreadyReviewed = event.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Event already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    event.reviews.push(review)

    event.numReviews = event.reviews.length

    event.rating =
      event.reviews.reduce((acc, item) => item.rating + acc, 0) /
      event.reviews.length

    await event.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({}).sort({ rating: -1 }).limit(3)

  res.json(events)
})

export {
  getEvents,
  getEventById,
  deleteEvent,
  createEvent,
  updateEvent,
  createEventReview,
  getTopEvents,
}
