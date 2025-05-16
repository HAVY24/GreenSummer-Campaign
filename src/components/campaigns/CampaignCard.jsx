import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { formatStatus } from "../../utils/formatStatus";
import Badge from "../ui/Badge";

const CampaignCard = ({ campaign }) => {
  const {
    _id,
    name,
    description,
    startDate,
    endDate,
    location,
    status,
    coverImage,
  } = campaign;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 relative">
        {coverImage ? (
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-600">
            <span className="text-xl font-medium">MHX</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge color={formatStatus(status).color}>
            {formatStatus(status).text}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <Link
          to={`/campaigns/${_id}`}
          className="inline-block w-full text-center py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
