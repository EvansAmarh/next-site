"use clent";

import { deleteCollection } from '@/actions/collection';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import useFetch from '@/hooks/use-fetch';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeleteCollectionDialog = ({collection, entriesCount = 0}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const {
    loading: isDeleting,
    fn: deleteCollectionFn,
    data: deletedCollection,
  } = useFetch(deleteCollection);

  useEffect(() =>{
    if (deletedCollection && !isDeleting){
      setOpen(false)
      toast.error(`Collection "${collection.name}" and all its entries deleted`);
      router.push("/dashboard")
    }
  },[deletedCollection, isDeleting])
  
  const handleDelete = () => {
    deleteCollectionFn(collection.id);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild><Button variant="destructive" size="sm" ><Trash className="h-4 w-4 mr-2" /> Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{collection.name}&quot;?</AlertDialogTitle>
          <div className='space-y-2 text-muted-foreground text-sm'>
            <p>This will permanently delete:</p>
            <ul className='list-disc list-inside'>
              <li>The collection &quot;{collection.name}&quot;</li>               
              <li>
                {entriesCount} journal{" "} {entriesCount === 1 ? "entry" : "entries"}
              </li>
            </ul>
            <p className='font-semibold text-red-600'>This action cannot be undone.</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete} disabled={isDeleting}>{isDeleting?"Deleting...":"Delete Collection"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCollectionDialog;