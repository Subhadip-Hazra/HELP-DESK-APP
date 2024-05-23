import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { lock } from '../assets/icons';
import Swal from 'sweetalert2';

const Unauthorized = () => {
    const { user } = useContext(AuthContext);

    const handleRequestAdminAccess = async () => {
        if (user?.email) {
            try {
                const response = await fetch('https://help-desk-backend-6ob3.onrender.com/admin-req', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: user.email }),
                });

                if (response.ok) {
                    const title = 'Request sent successfully!';
                    showSuccessToast('success',title);
                } else {
                    const title = 'Failed to send request. Please try again later.';
                    showSuccessToast('error',title);
                }
            } catch (error) {
                console.error('Error sending request:', error);
                const title = 'An error occurred. Please try again later.';
                showSuccessToast('error',title);

            }
        } else {
            const title = 'User email is not available.';
            showSuccessToast('error',title);
        }
    };

    const showSuccessToast = (icon,title) => {
        Swal.fire({
            icon: icon,
            title: title,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 700,
            timerProgressBar: true
        }).then(() => {
            window.location.href = "/";
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <img src={lock} alt="Page protected" className="w-1/2 h-1/2 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Unauthorized</h1>
                <p className="text-lg mb-4">You do not have permission to view this page.</p>
            </div>
            <button
                onClick={handleRequestAdminAccess}
                className="mt-4 px-4 py-2 bg-blue text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Send a request for admin
            </button>
        </div>
    );
};

export default Unauthorized;
