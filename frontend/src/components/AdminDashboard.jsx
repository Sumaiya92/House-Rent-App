import { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOwners = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8001/api/admin/all-owners', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setOwners(response.data.owners);
            } catch (err) {
                setError('Failed to load owners');
            } finally {
                setLoading(false);
            }
        };

        fetchOwners();
    }, []);

    const handleAction = async (ownerId, action) => {
        try {
            // Sending action request for approve or reject
            await axios.post('http://localhost:8001/api/admin/owner-action', {
                ownerId,
                action,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Update state to reflect changes
            setOwners(owners.map(owner =>
                owner._id === ownerId ? { ...owner, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'pending' } : owner
            ));
        } catch (err) {
            setError('Failed to process action');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Header Section */}
            <header className="bg-blue-600 text-white p-6 rounded-lg shadow-md mb-8">
                <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-xl mt-2">Manage Owner Applications</p>
            </header>

            {/* Error Handling */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {/* Loading State */}
            {loading ? (
                <div className="text-center text-blue-600">Loading...</div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-semibold mb-6">Owner Approval List</h2>
                    <div className="space-y-6">
                        {owners.map(owner => (
                            <div key={owner._id} className="flex justify-between items-center border-b-2 p-4">
                                <div className="flex flex-col space-y-2">
                                    <p className="text-xl font-semibold">{owner.name}</p>
                                    <p className="text-gray-600">{owner.email}</p>
                                    <p className="text-sm text-gray-500">Status: {owner.status}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    {owner.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleAction(owner._id, 'approve')}
                                                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleAction(owner._id, 'reject')}
                                                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    {owner.status === 'approved' && (
                                        <button
                                            onClick={() => handleAction(owner._id, 'revoke')}
                                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                        >
                                            Revoke
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
