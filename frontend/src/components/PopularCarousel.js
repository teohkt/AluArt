import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const ProductCarousel = (props) => {
  const dispatch = useDispatch()
  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1200, min: 990 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    tabletSmall: {
      breakpoint: { max: 990, min: 767 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  }

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error || !products ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=''
      containerClass='container-with-dots'
      dotListClass=''
      focusOnSelect={false}
      infinite
      itemClass=''
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      showDots={false}
      sliderClass=''
      slidesToSlide={1}
      id='topProductCarousel'
    >
      {products.map((product) => (
        <div key={product._id} className='carouselContent'>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
            <Row className='px-3 py-2'>
              <Col md={9} className='px-0'>
                <h5>{product.name}</h5>
              </Col>
              <Col md={3} className='px-0'>
                <p>${product.price}</p>
              </Col>
            </Row>
          </Link>
        </div>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
