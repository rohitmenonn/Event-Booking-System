import React from 'react'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { ListGroup, Button, Form } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const FAQScreen = () => {
    
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    return (
        <div className="container">
        <div id="faq">
            <div className="faq-main">
              <p className="faq-header">Frequently Asked Questions (FAQ)</p>
              <div className="faq-q-tab">
                <p className="question d-flex justify-content-between"> Lorem ipsum dolor sit amet, consectetur adipiscing elit? <button className="faq-button"><i className="fa fa-angle-down toggle-icon"></i> <i className="fa fa-angle-up hide toggle-icon"></i></button></p>
                <div className="faq-a-tab">
                  <p className="answer">
                    Quisque eget ligula ac tellus sodales posuere. Pellentesque at risus a dui eleifend porta et rhoncus odio. Aliquam lacinia porta est.
                  </p>
                </div>
              </div>
              <div className="faq-q-tab">
                <p className="question d-flex justify-content-between"> Lorem ipsum dolor sit amet, consectetur adipiscing elit? <button className="faq-button"><i className="fa fa-angle-down toggle-icon"></i> <i className="fa fa-angle-up hide toggle-icon"></i></button></p>
                <div className="faq-a-tab">
                  <p className="answer">
                    Quisque eget ligula ac tellus sodales posuere. Pellentesque at risus a dui eleifend porta et rhoncus odio. Aliquam lacinia porta est.
                  </p>
                </div>
              </div>
              {/* <div className="faq-q-tab">
                <p className="question d-flex justify-content-between"> Lorem ipsum dolor sit amet, consectetur adipiscing elit? <button className="faq-button"><i className="fa fa-angle-down toggle-icon"></i> <i className="fa fa-angle-up hide toggle-icon"></i></button></p>
                <div className="faq-a-tab">
                  <p className="answer">
                    Quisque eget ligula ac tellus sodales posuere. Pellentesque at risus a dui eleifend porta et rhoncus odio. Aliquam lacinia porta est.
                  </p>
                </div>
              </div> */}
            </div>
        </div>
        <ListGroup.Item className="questions">
                  <h2 className="headings">Post a Question</h2>
                  {userInfo ? (
                    <Form action="https://formspree.io/f/xyyleedo" method="POST">
                      <Form.Group controlId='comment'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          name="question"
                          required
                        ></Form.Control>
                      </Form.Group>
                      <a href="/">
                      <Button
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                      </a>
                    </Form>
                    ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to post a question{' '}
                    </Message>
                  )}
        </ListGroup.Item>
        </div>
    )
}

export default FAQScreen
