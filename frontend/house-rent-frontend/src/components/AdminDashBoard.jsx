import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const [owners, setOwners] = useState([]);
    const [properties, setProperties] = useState([]);
    const [renters, setRenters] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('owners');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ownersResponse, propertiesResponse, rentersResponse] = await Promise.all([
                axios.get('http://localhost:8000/api/admin/all-owners', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }),
                axios.get('http://localhost:8000/api/admin/all-properties', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                }),
                axios.get('http://localhost:8000/api/admin/all-renters', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
            ]);
            setOwners(ownersResponse.data || []);
            setProperties(propertiesResponse.data.properties || []);
            setRenters(rentersResponse.data.renters || []);
            toast.success('Data loaded successfully');
        } catch (err) {
            setError('Failed to load data');
            toast.error('Failed to load data');
        }
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        toast.info('Logged out successfully');
        navigate('/login');
    };

    const handleAction = async (ownerId, action) => {
        try {
            const response = await axios.post('http://localhost:8000/api/admin/owner-action', {
                ownerId, action,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            setOwners((prevOwners) =>
                prevOwners.map(owner =>
                    owner._id === ownerId ? { ...owner, status: response.data.owner.status } : owner
                )
            );
            toast.success(`Owner ${action}d successfully`);
        } catch (err) {
            toast.error('Failed to process action');
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'properties':
                return properties.length > 0 ? (
                    <div className="row">
                        {properties.map(property => (
                            <div key={property._id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{property.propertyType}</h5>
                                        <div className="card-text">
                                            <p><strong>Ad Type:</strong> {property.propertyAdType}</p>
                                            <p><strong>Address:</strong> {property.propertyAddress}</p>
                                            <p><strong>Amount:</strong> ${property.propertyAmt}</p>
                                            <p><strong>Owner:</strong> {property.ownerName}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info">No properties found</div>
                );
            case 'renters':
                return renters.length > 0 ? (
                    <div className="row">
                        {renters.map(renter => (
                            <div key={renter._id} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{renter.name}</h5>
                                        <p className="card-text">{renter.email}</p>
                                        <small className="text-muted">ID: {renter._id}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info">No renters found</div>
                );
            case 'owners':
            default:
                return owners.length > 0 ? (
                    <div className="row">
                        {owners.map(owner => {
                            const ownerStatus = owner.status || 'pending';
                            return (
                                <div key={owner._id} className="col-md-6 col-lg-4 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body">
                                            <h5 className="card-title">{owner.name}</h5>
                                            <p className="card-text">
                                                <strong>Phone:</strong> {owner.phoneNumber}<br />
                                                <strong>Status:</strong> <span className={`badge bg-${ownerStatus === 'approved' ? 'success' : ownerStatus === 'rejected' ? 'danger' : 'warning'}`}>
                                                    {ownerStatus.charAt(0).toUpperCase() + ownerStatus.slice(1)}
                                                </span>
                                            </p>
                                            {ownerStatus === 'pending' && (
                                                <div className="mt-3">
                                                    <button
                                                        onClick={() => handleAction(owner._id, 'approve')}
                                                        className="btn btn-success btn-sm me-2"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(owner._id, 'reject')}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="alert alert-info">No owners found</div>
                );
        }
    };

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#1E293B' }}>
                <div className="container">
                    <span className="navbar-brand text-white">Admin Dashboard</span>
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-light"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container mt-4">
                <div className="card shadow-sm mb-4">
                    <div className="card-header" style={{ backgroundColor: '#334155' }}>
                        <ul className="nav nav-tabs card-header-tabs">
                            {['properties', 'renters', 'owners'].map((tab) => (
                                <li className="nav-item" key={tab}>
                                    <button
                                        className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                        style={{
                                            color: activeTab === tab ? '#1E293B' : '#475569',
                                            backgroundColor: activeTab === tab ? '#F8FAFC' : 'transparent',
                                            border: `1px solid ${activeTab === tab ? '#E2E8F0' : 'transparent'}`,
                                            borderBottom: activeTab === tab ? 'none' : '1px solid #E2E8F0'
                                        }}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {loading ? (
                            <div className="text-center p-4">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            renderTabContent()
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default AdminDashboard;