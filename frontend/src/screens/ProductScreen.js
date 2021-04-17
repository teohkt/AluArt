import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { addToCart } from '../actions/cartAction'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = (props) => {
  const [qty, setQty] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const { success: successProductReview, error: errorProductReview } = useSelector((state) => state.productReviewCreate)
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(props.match.params.id))
  }, [dispatch, props.match, successProductReview])

  const addToCartHandler = () => {
    dispatch(addToCart(props.match.params.id, qty))
    props.history.push(`/cart`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(props.match.params.id, {
        rating,
        comment,
      })
    )
  }
  return (
    <>
      <Link className='btn btn-dark my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={`Can - Alu | ${product.name}`} />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                  {product.category}
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup.Item className='borderless-bottom' variant='flush'>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className='borderless-top borderless-bottom'>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item className='borderless-top borderless-bottom'>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {' '}
                              {x + 1}{' '}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='borderless-top' id='addToCartButtonContainer'>
                  <Button
                    className='btn-block'
                    type='button'
                    variant='dark'
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={5} id='reviewsSection'>
              <Row id='reviewsTitleRow'>
                <h2>Reviews ({product.numReviews})</h2>
                <Rating rating={product.rating} id='productPageRating' />
              </Row>

              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Row id='reviewSubtitle'>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                    </Row>

                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Row id='newReviewTitle'>
                <h2>Write a customer review</h2>
              </Row>
              <ListGroup variant='flush'>
                {/* <ListGroup.Item> */}
                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    <Form.Group as={Row} controlId='rating'>
                      <Form.Label column sm='3'>
                        Rating
                      </Form.Label>
                      <Col sm='9'>
                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId='comment'>
                      <Form.Label column sm='3'>
                        Comment
                      </Form.Label>
                      <Col sm='9'>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                    <Button type='submit' variant='dark'>
                      Submit
                    </Button>
                  </Form>
                ) : (
                  <Message>
                    Please <Link to='/login'>sign in</Link> to leave a review
                  </Message>
                )}
                {/* </ListGroup.Item> */}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
