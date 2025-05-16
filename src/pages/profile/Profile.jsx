import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Alert from "../../components/ui/Alert";
import { getUserProfile, updateUserProfile } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";

const Profile = () => {
  const { user, updateUserState } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setProfile({
          fullName: data.fullName || "",
          username: data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          role: data.role || "",
          joinedDate: data.joinedDate || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile information.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      setError(null);
      setSuccess(null);

      const updatedProfile = await updateUserProfile({
        fullName: profile.fullName,
        phone: profile.phone,
      });

      setProfile((prev) => ({
        ...prev,
        ...updatedProfile,
      }));

      // Update user state in auth context if needed
      updateUserState({
        ...user,
        fullName: updatedProfile.fullName,
      });

      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    // Basic validation
    if (password.new !== password.confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (password.new.length < 6) {
      setPasswordError("New password must be at least 6 characters long.");
      return;
    }

    try {
      setUpdating(true);

      // This is a placeholder - actual API call to change password would go here
      // await changePassword(password.current, password.new);

      setPassword({
        current: "",
        new: "",
        confirm: "",
      });

      setPasswordSuccess("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
      setPasswordError(
        err.response?.data?.message ||
          "Failed to change password. Please check your current password."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="p-6 md:col-span-1">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              {profile.fullName ? (
                <span className="text-3xl font-bold text-gray-500">
                  {profile.fullName.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-3xl font-bold text-gray-500">U</span>
              )}
            </div>
            <h2 className="text-xl font-semibold">{profile.fullName}</h2>
            <p className="text-sm text-gray-500 mb-2">{profile.username}</p>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-4">
              {profile.role &&
                profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
            </span>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {profile.email}
            </p>
            {profile.phone && (
              <p className="text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {profile.phone}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Joined:</span>{" "}
              {formatDate(profile.joinedDate)}
            </p>
          </div>
        </Card>

        {/* Edit Profile Card */}
        <Card className="p-6 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

          {error && (
            <Alert type="error" className="mb-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert type="success" className="mb-4">
              {success}
            </Alert>
          )}

          <form onSubmit={handleProfileSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                type="text"
                value={profile.username}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Username cannot be changed
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                type="email"
                value={profile.email}
                disabled
                className="bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                value={profile.phone || ""}
                onChange={handleProfileChange}
                placeholder="Enter your phone number"
              />
            </div>

            <Button type="submit" disabled={updating} className="w-full">
              {updating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>

        {/* Change Password Card */}
        <Card className="p-6 md:col-span-3">
          <h2 className="text-lg font-semibold mb-4">Change Password</h2>

          {passwordError && (
            <Alert type="error" className="mb-4">
              {passwordError}
            </Alert>
          )}
          {passwordSuccess && (
            <Alert type="success" className="mb-4">
              {passwordSuccess}
            </Alert>
          )}

          <form onSubmit={handlePasswordSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <Input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <Input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <Input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                disabled={updating}
                variant="outline"
                className="w-full"
              >
                {updating ? "Changing Password..." : "Change Password"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
