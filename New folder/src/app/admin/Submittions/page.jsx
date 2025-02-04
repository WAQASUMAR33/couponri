'use client';
import { useState, useEffect } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'; // Import TrashIcon from v2

export default function ViewSubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const res = await fetch('/api/submitoffer', {
                    method: 'GET',
                });
                const data = await res.json();

                // Sort submissions by startDate in descending order
                const sortedData = data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
                setSubmissions(sortedData);
            } catch (error) {
                setError('Error fetching submissions');
                console.error('Error fetching submissions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/submitoffer/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete offer');
            }

            // Remove the deleted submission from state
            setSubmissions((prevSubmissions) => 
                prevSubmissions.filter((submission) => submission.id !== id)
            );
        } catch (error) {
            setError('Error deleting submission');
            console.error('Error deleting submission:', error);
        }
    };

    if (loading) return <div className="text-center text-gray-700">Loading...</div>;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Submissions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {submissions.map((submission) => (
                    <div
                        key={submission.id}
                        className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 transition-transform transform hover:scale-105 relative"
                    >
                        <h2 className="text-xl font-semibold text-gray-900">{submission.storeWebsite}</h2>
                        <p className="text-sm text-gray-600">{submission.offerType}</p>
                        <p className="mt-3 text-gray-700">{submission.description}</p>
                        <p className="text-sm text-gray-500 mt-4">Code: <span className="font-medium">{submission.code}</span></p>
                        <p className="text-sm text-gray-500">
                            Start Date: <span className="font-medium">{submission.startDate ? new Date(submission.startDate).toLocaleDateString() : 'N/A'}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            Expiration Date: <span className="font-medium">{submission.expirationDate ? new Date(submission.expirationDate).toLocaleDateString() : 'N/A'}</span>
                        </p>
                        <button
                            onClick={() => handleDelete(submission.id)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition-colors"
                        >
                            <TrashIcon className="h-6 w-6" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
