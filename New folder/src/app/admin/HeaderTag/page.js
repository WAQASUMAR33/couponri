'use client';

import Loader from '../../../app/Loader';
import { useEffect, useState } from 'react';

export default function HeaderTagAdmin() {
  const [record, setRecord] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing Headertag record
    const fetchData = async () => {
      try {
        const response = await fetch('/api/headertag');
        const data = await response.json();
        setRecord(data);
        setEditorContent(data?.code || '');
      } catch (error) {
        console.error('Error fetching Headertag:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    const method = record?.id ? 'PUT' : 'POST';
    const url = '/api/headertag';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: record?.id, code: editorContent }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setRecord(updatedData);
        alert('Header tag saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to save Headertag:', error);
      alert('Failed to save Headertag.');
    }
  };

  if (loading) return <p><Loader/></p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow-md">
      <h1 className="text-xl font-bold mb-4">Manage Header Tag</h1>
      <textarea
        value={editorContent}
        onChange={(e) => setEditorContent(e.target.value)}
        className="w-full h-64 p-2 border rounded"
        placeholder="Enter header tag code..."
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
