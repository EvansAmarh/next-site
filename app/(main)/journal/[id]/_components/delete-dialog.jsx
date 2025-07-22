"use clent";

import { deleteJournalEntry } from '@/actions/journal';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import useFetch from '@/hooks/use-fetch';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeleteDialog = ({entryId}) => {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    loading: isDeleting,
    fn: deleteEntryFn,
    data: deletedEntry,
  } = useFetch(deleteJournalEntry);

  useEffect(() =>{
    if (deletedEntry && !isDeleting){
      setDeleteDialogOpen(false)
      toast.error(`Journal entry deleted successfully`);
      router.push(`/collection/${deletedEntry.collectionId? deletedEntry.collection:"unorganized"}`); 
    }
  },[deletedEntry, isDeleting])
  
  const handleDelete = () => {
    deleteEntryFn(entryId);
  }

  return (
    <AlertDialog deleteDialogOpen={deleteDialogOpen} onDeleteDialogOpenChange={setDeleteDialogOpen}>
      <AlertDialogTrigger asChild><Button variant="destructive" size="sm" ><Trash className="h-4 w-4 mr-2" /> Delete</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your journal entry.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button className="bg-red-500 hover:bg-red-600" onClick={handleDelete} 
          disabled={isDeleting}>{isDeleting?"Deleting...":"Delete Entry"}</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog;