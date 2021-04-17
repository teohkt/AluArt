import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import PopularCarousel from '../components/PopularCarousel'
import HomeJumbotron from '../components/HomeJumbotron'

import Product from '../components/Product'

import { listProducts } from '../actions/productActions'

import { PRODUCT_DETAILS_RESET } from '../constants/productConstants'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  console.log(pageNumber)
  console.log(keyword)

  const [showCarousel, setShowCarousel] = useState(true)
  const [showSearchResults, setShowSearchResults] = useState(false)

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
    dispatch({ type: PRODUCT_DETAILS_RESET })
    if (Number(pageNumber) === 1 && !keyword) {
      setShowCarousel(true)
    } else {
      setShowCarousel(false)
    }

    if (keyword) {
      setShowSearchResults(true)
    } else {
      setShowSearchResults(false)
    }
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />

      {showCarousel && (
        <>
          <HomeJumbotron />
          <h1>Trending</h1>
          <PopularCarousel />
        </>
      )}

      {showSearchResults && (
        <>
          {' '}
          <Link to='/' className='btn btn-light'>
            Main Page
          </Link>
          <h1>Search Results For: {keyword}</h1>
        </>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {!keyword && <h1>Latest</h1>}

          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  )
}

export default HomeScreen
