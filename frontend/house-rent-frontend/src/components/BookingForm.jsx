// BookingForm.js
import React from 'react';

const BookingForm = ({ bookingForm, handleFormChange, handleSubmitBooking, setShowBookingForm }) => {
    return (
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                <h2>Book Property</h2>
                <form onSubmit={handleSubmitBooking} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label>Tenant Name:</label>
                        <input
                            type="text"
                            name="tenantName"
                            value={bookingForm.tenantName}
                            onChange={handleFormChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Contact Number:</label>
                        <input
                            type="tel"
                            name="tenantContact"
                            value={bookingForm.tenantContact}
                            onChange={handleFormChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Booking Date:</label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={bookingForm.bookingDate}
                            onChange={handleFormChange}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label>Additional Information:</label>
                        <textarea
                            name="additionalInfo"
                            value={bookingForm.additionalInfo}
                            onChange={handleFormChange}
                            style={styles.textarea}
                        />
                    </div>

                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.submitButton}>Submit Booking</button>
                        <button type="button" onClick={() => setShowBookingForm(false)} style={styles.cancelButton}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '100%',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    },
    formGroup: {
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        height: '100px'
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px'
    },
    submitButton: {
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    cancelButton: {
        backgroundColor: '#ccc',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default BookingForm;
