"use client";

import React, { useEffect, useState } from "react";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-dialog";
import useFetch from "@/hooks/use-fetch";
import { createCollection, getCollections } from "@/actions/collection";
import { getJournalEntries } from "@/actions/journal";
import { toast } from "sonner";

const Collections = () => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [entriesByCollection, setEntriesByCollection] = useState({});

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

const fetchData = async () => {
  try {
    const fetchedCollections = await getCollections();
    const entriesByCollection = {};

    for (const collection of fetchedCollections) {
      const res = await getJournalEntries({ collection_id: collection.id });
      entriesByCollection[collection.id] = res?.data?.entries || [];
    }

    const unorganizedRes = await getJournalEntries({ collection_id: null });
    const unfilteredUnorganized = unorganizedRes?.data?.entries || [];

    const unorganizedEntries = unfilteredUnorganized.filter(
      (entry) => !entry.collection_id
    );
    entriesByCollection["unorganized"] = unorganizedEntries;

    if (unorganizedEntries.length > 0) {
      fetchedCollections.unshift({
        id: "unorganized",
        name: "Unorganized",
        description: "",
        isUnorganized: true,
      });
    }

    setCollections(fetchedCollections);
    setEntriesByCollection(entriesByCollection);
    // console.log(fetchedCollections, entriesByCollection);
  } catch (error) {
    toast.error("Failed to load collections or entries.");
  }
};




  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (createdCollection) {
      toast.success(`Collection ${createdCollection.name} created!`);
      setIsCollectionDialogOpen(false);
      fetchData();
    }
  }, [createdCollection]);

  const handleCreateCollection = async (formData) => {
    await createCollectionFn(formData);
    setIsCollectionDialogOpen(false);
  };

  if (collections.length === 0) return <></>;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CollectionPreview
          isCreateNew
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />
        {collections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection?.[collection.id] || []}
            isUnorganized={collection.id === "unorganized"}
          />
        ))}
        <CollectionForm
          loading={createCollectionLoading}
          onSuccess={handleCreateCollection}
          open={isCollectionDialogOpen}
          setOpen={setIsCollectionDialogOpen}
        />
      </div>
    </section>
  );
};

export default Collections;
