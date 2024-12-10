import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">
                Welcome to Event Ticketing Application
            </h1>
            <div className="flex flex-row space-x-4">
                <button
                    onClick={() => navigate('/customer/login')}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Customer Login
                </button>
                <button
                    onClick={() => navigate('/vendor/login')}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Vendor Login
                </button>
                <button
                    onClick={() => navigate('/adminPanel')}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Admin Panel
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;