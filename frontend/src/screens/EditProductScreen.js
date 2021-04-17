import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'

import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const EditProductScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [image, setImage] = useState('')
  const [description, setDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, product, error } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productList')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setCountInStock(product.countInStock)
        setImage(product.image)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
      }
    }
  }, [dispatch, productId, product, successUpdate, history])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        countInStock,
        image,
        description,
        brand,
        category,
      })
    )
    console.log('button pressed')
  }

  return (
    <>
      <Link to='/admin/productList' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button variant='dark' type='submit'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default EditProductScreen
