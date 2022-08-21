import React from 'react'
import Button from '../components/ui/Button'

const PageNotFound=()=> {
  return (

        <div className='center'>
            <h3>Oops! Seems like you have typed a wrong URL!</h3>
            <Button link="/">Back to homepage</Button>
        </div>

  )
}

export default PageNotFound;