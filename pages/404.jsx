import React from 'react'
import Button from '../components/ui/Button'
import Head from 'next/head'

const PageNotFound=()=> {
  return (

        <div className='center'>
            <Head>
              <title>404 Page Not Found</title>
            </Head>
            <h3>Oops! Seems like you have typed a wrong URL!</h3>
            <Button link="/">Back to homepage</Button>
        </div>

  )
}

export default PageNotFound;