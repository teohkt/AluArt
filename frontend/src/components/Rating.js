import React from 'react'
// import PropTypes from 'prop-types'

const Rating = ({ rating, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            rating >= 1
              ? 'fas fa-star'
              : rating >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            rating >= 2
              ? 'fas fa-star'
              : rating >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            rating >= 3
              ? 'fas fa-star'
              : rating >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            rating >= 4
              ? 'fas fa-star'
              : rating >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
        <i
          style={{ color }}
          className={
            rating >= 5
              ? 'fas fa-star'
              : rating >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <p>{text && text}</p>
    </div>
  )
}

Rating.defaultProps = {
  color: 'rgb(255,215,0)',
}
// Rating.propTypes = {
//   rating: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string,
// }
export default Rating
