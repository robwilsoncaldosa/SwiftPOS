import { Loader2Icon } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
    <main className='h-screen flex justify-center items-center'>
    <Loader2Icon className='animate-spin'/>

    </main>
  )
}

export default loading