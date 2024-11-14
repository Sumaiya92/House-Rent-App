import React from 'react';
import { useOwnerDashboard } from './Hooks/useOwnerDashboard.js';
import AddPropertyForm from './AddPropertyForm';
import PropertiesTable from './PropertiesTable';
import BookingsTable from './BookingsTable';
import './owner.css';

const OwnerDashboard = () => {
  const {
    properties,
    bookings,
    formData,
    selectedTab,
    setSelectedTab,
    handleAddProperty,
    handleDeleteProperty,
    handleChange
  } = useOwnerDashboard();

  return (
    <div className="owner-dashboard container">
      {/* Tab Navigation */}
      <div className="tab-header">
      {console.log("booking id",bookings)}
        <button
          className={`tab ${selectedTab === 'addProperty' ? 'active' : ''}`}
          onClick={() => setSelectedTab('addProperty')}
        >
          Add Property
        </button>
        <button
          className={`tab ${selectedTab === 'allProperties' ? 'active' : ''}`}
          onClick={() => setSelectedTab('allProperties')}
        >
          All Properties
        </button>
        <button
          className={`tab ${selectedTab === 'allBookings' ? 'active' : ''}`}
          onClick={() => setSelectedTab('allBookings')}
        >
          All Bookings
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'addProperty' && (
        <AddPropertyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleAddProperty}
        />
      )}
      {selectedTab === 'allProperties' && (
        <PropertiesTable
          properties={properties}
          handleDeleteProperty={handleDeleteProperty}
        />
      )}
      {selectedTab === 'allBookings' && (
        <BookingsTable bookings={bookings} />
      )}
    </div>
  );
};

export default OwnerDashboard;
