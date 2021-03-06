import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const SearchBox = () => {
  const history = useHistory()
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
      setKeyword('')
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline id='searchForm'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
      ></Form.Control>

      <Button type='submit' variant='outline-secondary' className='p-2 mt-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
