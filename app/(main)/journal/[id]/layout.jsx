import Link from 'next/link';
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners';

const EntryLayout = ({children}) => {
  return (
    <div className='container mx-auto px-4 py-8'>
        <div>
            <Link 
            href="/dashboard" className='text-sm text-blue-600 hover:text-blue-700 cursor-pointer'>
               {'\u2190'} Return to Dashboard</Link>
        </div>
        <Suspense fallback={<BarLoader color="blue" width="100%"/>}>{children}</Suspense>
        </div>
  )
}

export default EntryLayout;