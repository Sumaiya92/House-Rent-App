import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDash.css';

function AdminDashboard() {
    const [owners, setOwners] = useState([]);
    const [properties, setProperties] = useState([]);
    const [renters, setRenters] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('owners');

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ownersResponse, propertiesResponse, rentersResponse] = await Promise.all([
                axios.get('http://localhost:8001/api/admin/all-owners', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }),
                axios.get('http://localhost:8001/api/admin/all-properties', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }),
                axios.get('http://localhost:8001/api/admin/all-renters', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
            ]);
            setOwners(ownersResponse.data.owners);
            setProperties(propertiesResponse.data.properties);
            setRenters(rentersResponse.data.renters);
        } catch (err) {
            setError('Failed to load data');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (ownerId, action) => {
        try {
            const response = await axios.post('http://localhost:8001/api/admin/owner-action', {
                ownerId, action,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setOwners((prevOwners) =>
                prevOwners.map(owner =>
                    owner._id === ownerId ? { ...owner, status: response.data.owner.status } : owner
                )
            );
        } catch (err) {
            setError('Failed to process action');
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'properties':
                return properties.map(property => (
                    <div key={property._id} className="p-4 border-b">
                        <p>Property Type: {property.propertyType}</p>
                        <p>Ad Type: {property.propertyAdType}</p>
                        <p>Address: {property.propertyAddress}</p>
                        <p>Amount: ${property.propertyAmt}</p>
                        <p>Owner: {property.ownerName}</p>
                    </div>
                ));
            case 'renters':
                return renters.map(renter => (
                    <div key={renter._id} className="p-4 border-b">
                        <p>{renter.name}</p>
                        <p>{renter.email}</p>
                        <p>{renter._id}</p>
                    </div>
                ));
            case 'owners':
            default:
                return owners.map(owner => {
                    const ownerStatus = owner.status || 'pending';
                    return (
                        <div key={owner._id} className="p-4 border-b flex justify-between">
                            <div>
                                <p>{owner._id}</p>
                                <p>{owner.name}</p>
                                <p>{owner.email}</p>
                                <p>Status: {ownerStatus === 'pending' ? 'Pending' : ownerStatus === 'approved' ? 'Approved' : 'Rejected'}</p>
                            </div>
                            <div>
                                {ownerStatus === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleAction(owner._id, 'approve')}
                                            className="grant-button"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleAction(owner._id, 'reject')}
                                            className="grant-button ml-2 bg-red-500"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                });
        }
    };

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <button className="logout-button">Logout</button>
            </header>
            <div className="tab-header">
                <button onClick={() => setActiveTab('properties')} className={`tab-button ${activeTab === 'properties' ? 'active' : ''}`}>All Properties</button>
                <button onClick={() => setActiveTab('renters')} className={`tab-button ${activeTab === 'renters' ? 'active' : ''}`}>All Renters</button>
                <button onClick={() => setActiveTab('owners')} className={`tab-button ${activeTab === 'owners' ? 'active' : ''}`}>All Owners</button>
            </div>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div>Loading...</div> : <div>{renderTabContent()}</div>}
        </div>
    );
}

export default AdminDashboard;
