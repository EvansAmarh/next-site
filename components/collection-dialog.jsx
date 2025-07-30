"use client";

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { collectionSchema } from '@/app/lib/schema';
import { BarLoader } from 'react-spinners';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CollectionForm = ({ onSuccess, open, setOpen, loading }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
  resolver: zodResolver(collectionSchema),
  defaultValues: {
    name: '',
    description: '',
  },
});

const onSubmit = handleSubmit(async (data) => {
  await onSuccess(data);
  reset();
});

  return (
    <Dialog open={open} onOpenChange={setOpen}>
     <DialogContent>
        <DialogHeader>
         <DialogTitle>Create New Collection</DialogTitle>
         {loading && <BarLoader color='blue' width={"100%"} />}

         <form onSubmit={onSubmit} className='space-y-2'>
            <div className='space-y-2'>
                <label className='text-sm font-medium'>Collection Name</label>
                <Input disabled={loading} {...register("name")} placeholder="Enter collection name..." 
                  className={`${errors.title?"border-red-500" : "" }`} />
                  {errors.name && (
                    <p className='text-red-500 text-sm'>{errors.title.message}</p>
                  )}
            </div>
             <div className='space-y-2'>
                <label className='text-sm font-medium'>Collection Name</label>
                <Textarea disabled={loading} {...register("description")} placeholder="Describe your collection..." 
                  className={`${errors.description?"border-red-500" : "" }`} />
                  {errors.description && (
                    <p className='text-red-500 text-sm'>{errors.description.message}</p>
                  )}
            </div>

            <div className='flex justify-end gap-4'>
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-blue-600">Create Collection</Button>
            </div>
         </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CollectionForm