// import React, { useState, useEffect } from "react";
// import axios from 'axios'
// // import axios from "./axios"; // Importing axios instance
// // import Card from "./Card"; // Import Card component

// const Home = () => {
//     const [properties, setProperties] = useState([]);
//     const [search, setSearch] = useState("");
//     const [addressType, setAddressType] = useState("");
//     const [propertyType, setPropertyType] = useState("");

//     // Fetch properties from backend API
//     useEffect(() => {
//         const fetchProperties = async () => {
//             try {
//                 const response = await axios.get("/properties"); // Adjust the endpoint if needed
//                 setProperties(response.data);
//             } catch (error) {
//                 console.error("Error fetching properties:", error);
//             }
//         };
//         fetchProperties();
//     }, []);

//     // Handle filter changes
//     const handleSearchChange = (event) => setSearch(event.target.value);
//     const handleAddressTypeChange = (event) => setAddressType(event.target.value);
//     const handlePropertyTypeChange = (event) => setPropertyType(event.target.value);

//     // Filter properties based on search and selected filters
//     const filteredProperties = properties.filter((property) => {
//         const searchMatch = property.location.toLowerCase().includes(search.toLowerCase());
//         const addressMatch = addressType ? property.addressType === addressType : true;
//         const propertyMatch = propertyType ? property.propertyType === propertyType : true;
//         return searchMatch && addressMatch && propertyMatch;
//     });

//     return (
//         <div className="home-container">
//             <header className="header">
//                 <div className="logo">MySpark</div>
//                 <div className="auth-links">
//                     <button>Sign In</button> | <button>Sign Up</button>
//                 </div>
//             </header>

//             <section className="hero-section">
//                 <h1>Welcome to MySpark</h1>
//                 <p>Find your dream property with us!</p>
//             </section>

//             <section className="filter">
//                 <input
//                     type="text"
//                     placeholder="Search for an Address"
//                     value={search}
//                     onChange={handleSearchChange}
//                     className="search-input"
//                 />
//                 <select onChange={handleAddressTypeChange} className="filter-select">
//                     <option value="">Select Address Type</option>
//                     <option value="Residential">Residential</option>
//                     <option value="Vacation">Vacation</option>
//                 </select>
//                 <select onChange={handlePropertyTypeChange} className="filter-select">
//                     <option value="">Select Property Type</option>
//                     <option value="Apartment">Apartment</option>
//                     <option value="House">House</option>
//                     <option value="Condo">Condo</option>
//                 </select>
//             </section>

//             <section className="property-list">
//                 {filteredProperties.length === 0 ? (
//                     <p>No properties available. Please check back later.</p>
//                 ) : (
//                     <div className="card-container">
//                         {filteredProperties.map((property, index) => (
//                             <Card
//                                 key={index}
//                                 imageUrl={property.imageUrl}
//                                 location={property.location}
//                                 propertyType={property.propertyType}
//                                 addressType={property.addressType}
//                                 onButtonClick={property.onButtonClick}
//                             />
//                         ))}
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// };

// export default Home;
import React from 'react'
import './home.css'
import { Link } from 'react-router-dom';

const Card = ({ imageUrl, location, propertyType, addressType, onButtonClick }) => {
    return (
        <div className='card'>
            <img src={imageUrl} alt="Property" />
            <p><strong>Location:</strong></p>
            <p>{location}</p>
            <p><strong>Property Type:</strong></p>
            <p>{propertyType}</p>
            <p><strong>Address Type:</strong></p>
            <p>{addressType}</p>
            <button onClick={onButtonClick}>Get Info</button>
        </div>
    );
};

const sampleProperties = [
    {
        imageUrl: "https://th.bing.com/th/id/OIP.ohdyXRlOcsExd8QwhK7nggHaE8?rs=1&pid=ImgDetMain", // New York Apartment
        location: "New York, NY",
        propertyType: "Apartment",
        addressType: "Residential",
        onButtonClick: () => alert("Info about New York Apartment"),
    },
    {
        imageUrl: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg", // Los Angeles House
        location: "Los Angeles, CA",
        propertyType: "House",
        addressType: "Residential",
        onButtonClick: () => alert("Info about Los Angeles House"),
    },
    {
        imageUrl: "https://th.bing.com/th/id/OIP.aeIUTrvcAl40WChKi9cBNgHaE8?rs=1&pid=ImgDetMain", // Chicago Condo
        location: "Chicago, IL",
        propertyType: "Condo",
        addressType: "Residential",
        onButtonClick: () => alert("Info about Chicago Condo"),
    },
        {
            imageUrl: "https://th.bing.com/th/id/OIP.ohdyXRlOcsExd8QwhK7nggHaE8?rs=1&pid=ImgDetMain", // New York Apartment
            location: "New York, NY",
            propertyType: "Apartment",
            addressType: "Residential",
            onButtonClick: () => alert("Info about New York Apartment"),
        },
        {
            imageUrl: "https://images.pexels.com/photos/1643388/pexels-photo-1643388.jpeg", // Los Angeles House
            location: "Los Angeles, CA",
            propertyType: "House",
            addressType: "Residential",
            onButtonClick: () => alert("Info about Los Angeles House"),
        },
        {
            imageUrl: "https://th.bing.com/th/id/OIP.aeIUTrvcAl40WChKi9cBNgHaE8?rs=1&pid=ImgDetMain", // Chicago Condo
            location: "Chicago, IL",
            propertyType: "Condo",
            addressType: "Residential",
            onButtonClick: () => alert("Info about Chicago Condo"),
        },
        {
            imageUrl: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg", // Miami Beach House
            location: "Miami, FL",
            propertyType: "House",
            addressType: "Vacation",
            onButtonClick: () => alert("Info about Miami Beach House"),
        },
        {
            imageUrl: "https://images.pexels.com/photos/2760128/pexels-photo-2760128.jpeg", // San Francisco Apartment
            location: "San Francisco, CA",
            propertyType: "Apartment",
            addressType: "Residential",
            onButtonClick: () => alert("Info about San Francisco Apartment"),
        }
    
];

function Home(){
    return(
        <div className="home-container">
            <h1>Our Trending Properties</h1>
            <p>Want to post your own property? <Link to="/register"><button className="reg-button">Register as Owner</button>
            </Link> </p>
            <div className='filter'>
                Filter By :  <input type="text" placeholder='Search for an Address'/>  
                <select id="filter1"  >
                    <option value="" disabled select>Select Address type</option>
                    <option value="Rent">Rent</option>
                    <option value="lease">Lease</option>

                </select>
                <select  id="filter2">
                    <option value="" disabled select>Select Property type</option>
                    <option value="apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Condo">Condo</option>
                    <option value='residential'>Residential</option>
                </select>
            </div>
            <div class="card-container">
            {sampleProperties.map((property, index) => (
                <Card 
                    key={index}
                    imageUrl={property.imageUrl}
                    location={property.location}
                    propertyType={property.propertyType}
                    addressType={property.addressType}
                    onButtonClick={property.onButtonClick}
                />
            ))}
            </div>
        </div>
    
    )
}


export default Home