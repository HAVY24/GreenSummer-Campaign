import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";

const CampaignForm = ({
  initialValues = {},
  onSubmit,
  buttonText = "Submit",
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    startDate: initialValues.startDate
      ? new Date(initialValues.startDate).toISOString().split("T")[0]
      : "",
    endDate: initialValues.endDate
      ? new Date(initialValues.endDate).toISOString().split("T")[0]
      : "",
    location: initialValues.location || "",
    status: initialValues.status || "planning",
    objectives: initialValues.objectives
      ? initialValues.objectives.join("\n")
      : "",
    requirements: initialValues.requirements
      ? initialValues.requirements.join("\n")
      : "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Transform multi-line text to arrays
      const objectives = formData.objectives
        .split("\n")
        .filter((line) => line.trim());
      const requirements = formData.requirements
        .split("\n")
        .filter((line) => line.trim());

      await onSubmit({
        ...formData,
        objectives,
        requirements,
      });
    } catch (err) {
      setError(err.message || "An error occurred while submitting the form");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Campaign Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Input
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Input
            label="Start Date"
            id="startDate"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <Input
            label="End Date"
            id="endDate"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="planning">Planning</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          required
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="objectives"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Objectives (one per line)
        </label>
        <textarea
          id="objectives"
          name="objectives"
          rows="3"
          value={formData.objectives}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        ></textarea>
      </div>

      <div>
        <label
          htmlFor="requirements"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Requirements (one per line)
        </label>
        <textarea
          id="requirements"
          name="requirements"
          rows="3"
          value={formData.requirements}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        ></textarea>
      </div>

      <div className="flex space-x-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : buttonText}
        </Button>
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;
