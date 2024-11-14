import React from 'react';

const AddPropertyForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="form-container">
      <h2>Add New Property</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Property Address"
          name="propertyAddress"
          value={formData.propertyAddress}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="propertyAmt"
          value={formData.propertyAmt}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Image URL"
          name="propertyImage"
          value={formData.propertyImage}
          onChange={handleChange}
        />
        <textarea
          placeholder="Additional Information"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Property Type"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Property Ad Type"
          name="propertyAdType"
          value={formData.propertyAdType}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Owner Contact"
          name="ownerContact"
          value={formData.ownerContact}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Owner Name"
          name="ownerName"
          value={formData.ownerName}
          onChange={handleChange}
        />
        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddPropertyForm;