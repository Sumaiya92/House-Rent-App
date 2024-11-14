import React from 'react';

const BookingsTable = ({ bookings }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Property Address</th>
                    <th>Owner Name</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(booking => (
                    <tr key={booking._id}>
                        <td>{booking._id}</td>
                        <td>{booking.propertyAddress}</td>
                        <td>{booking.ownerName}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BookingsTable;