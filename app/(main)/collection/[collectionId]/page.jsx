import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react';
import DeleteCollectionDialog from '../_components/delete-collection';
import JournalFilters from '../_components/journal-filter';

const CollectionPage = async ({ params }) => {
  const { collectionId } = params;

  const entries = await getJournalEntries({ collection_id: collectionId });
  const collections = await getCollections();
  const collection = collections?.find((col) => col.id === collectionId);

  const entryList = entries?.data?.entries ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold gradient-title">
            {collectionId === "unorganized"
              ? "Unorganized Entries"
              : collection?.name || "Collection"}
          </h1>
          {collection && (
            <DeleteCollectionDialog
              collection={collection}
              entriesCount={entryList.length}
            />
          )}
        </div>
        {collection?.description && (
          <h2 className="font-extralight pl-1">{collection.description}</h2>
        )}
      </div>

      <JournalFilters entries={entryList} />
    </div>
  );
};

export default CollectionPage;
