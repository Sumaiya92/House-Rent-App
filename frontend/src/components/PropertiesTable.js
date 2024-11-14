const PropertiesTable = ({ properties, handleEditProperty, handleDeleteProperty }) => {
  return (
    <div className="properties-list">
      <h2>All Properties</h2>
      <div className="properties">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="property-card">
              <img src={property.propertyImage || 'https://via.placeholder.com/150'} alt={property.propertyAddress} />
              <p>Owner : {property.ownerName}</p>
              <p>Propert address: {property.propertyAddress}</p>
              <p>Amount :{property.propertyAmt}</p>
              <p>Contact:{property.ownerContact}</p>
              <p>PropertyAdType:{property.propertyAdType}</p>
              <button onClick={() => handleDeleteProperty(property._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};
export default PropertiesTable;
