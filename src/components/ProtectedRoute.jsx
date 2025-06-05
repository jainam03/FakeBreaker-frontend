import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useAuth();

    // Show nothing while Clerk is loading
    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
                </div>
            </div>
        );
    }

    // If not signed in, redirect to auth page
    if (!isSignedIn) {
        return <Navigate to="/auth" replace />;
    }

    // If signed in, render the protected component
    return children;
};

export default ProtectedRoute; 