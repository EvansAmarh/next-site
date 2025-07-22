import Link from 'next/link';
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';

const CollectionLayout = ({children}) => {
  return (
    <div className='container mx-auto px-4 py-8'>
        <div>
            <Link 
            href="/dashboard" className='text-sm text-pink-600 hover:text-pink-700 cursor-pointer'>
               {'\u2190'} Return to Dashboard</Link>
        </div>
        <Suspense fallback={<BarLoader color="pink" width="100%"/>}>{children}</Suspense>
        </div>
  )
}

export default CollectionLayout;