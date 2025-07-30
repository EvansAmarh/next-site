import React from 'react'
import { Card, CardContent } from './card'
import { format } from 'date-fns'
import Link from 'next/link';

const EntryCard = ({entry}) => {
  return (
    <Link href={`/journal/${entry?.id}`}>
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className='flex items-start justify-between'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-2xl'>{entry?.mood_Data?.emoji}</span>
                            <h3 className='font-semibold text-lg'>{entry.title}</h3>
                        </div>
                        <div
                        className='text-gray-600 line-clamp-2'
                        dangerouslySetInnerHTML={{__html: entry.content}}
                        />
                    </div>
                    <time className='text-sm text-gray-500'>{format(new Date(entry.created_at), "MMM d, yyyy")}</time>
                </div>
                {entry?.collection && (
                    <div className='mt-4 flex items-center gap-2'>
                        <span className='text-sm px-4 py-1 bg-blue-100 text-blue-800 rounded'>
                         {entry.collection.name}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    </Link>
  )
}

export default EntryCard