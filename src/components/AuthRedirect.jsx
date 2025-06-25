import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useClerk } from '@clerk/clerk-react';

const AuthRedirect = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { openSignIn, openSignUp } = useClerk();
    const navigate = useNavigate();

    // Redirect to /upload if already signed in (useEffect to avoid render issues)
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate('/upload', { replace: true });
        }
    }, [isLoaded, isSignedIn, navigate]);

    // Show loading state while Clerk is initializing
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

    // If already signed in, redirect to upload page
    if (isSignedIn) {
        // Don't render anything while redirecting
        return null;
    }

    const handleSignIn = () => {
        openSignIn();
    };

    const handleSignUp = () => {
        openSignUp();
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome to fAKE BREAKer
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Please sign in or create an account to continue
                    </p>
                </div>
                
                <div className="mt-8 space-y-4">
                    <button 
                        onClick={handleSignIn}
                        className="w-full btn-primary py-3"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={handleSignUp}
                        className="w-full btn-secondary py-3"
                    >
                        Create Account
                    </button>
                </div>

                <div className="text-center mt-4">
                    <button 
                        onClick={() => navigate('/landing')}
                        className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthRedirect;