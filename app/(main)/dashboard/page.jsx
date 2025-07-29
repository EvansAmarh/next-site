import { getCollections } from '@/actions/collection';
import { getJournalEntries } from '@/actions/journal';
import React from 'react';
import Collections from './_components/collections';
import MoodAnalytics from './_components/mood-analytics';

const Dashboard = async () => {
  const collections = await getCollections();
  const entriesData = await getJournalEntries();

  const entries = entriesData?.data?.entries || [];

  const entriesByCollection = entries.reduce((acc, entry) => {
    const collectionId = entry.collection_id || 'unorganized';
    if (!acc[collectionId]) {
      acc[collectionId] = [];
    }
    acc[collectionId].push(entry);
    return acc;
  }, {});

  const collectionsWithUnorganized = [
    { id: 'unorganized', name: 'Unorganized', description: '', is_unorganized: true },
    ...collections,
  ];

  return (
    <div className="px-4 py-8 space-y-8">
      <section className="space-y-4">
        <MoodAnalytics />
      </section>

      <Collections
        collections={collectionsWithUnorganized}
        entriesByCollection={entriesByCollection}
      />
    </div>
  );
};

export default Dashboard;
