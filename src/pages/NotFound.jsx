import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        <div className="w-full h-0.5 bg-gray-200 my-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          We're sorry, the page you requested could not be found. Please check
          the URL or navigate back to the home page.
        </p>
        <div className="flex justify-center">
          <Link to="/">
            <Button size="lg">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
