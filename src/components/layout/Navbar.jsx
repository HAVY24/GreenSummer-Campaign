import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth } from "../../hooks/useAuth";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Disclosure as="nav" className="bg-green-600 shadow-sm">
      {({ open }) => (
        <>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/" className="text-white font-bold text-xl">
                    Mùa Hè Xanh
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                {/* Notification bell */}
                <button className="p-2 rounded-full text-white hover:bg-green-700">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-semibold">
                        {user?.fullName?.charAt(0) ||
                          user?.username?.charAt(0) ||
                          "U"}
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Menu.Item>
                        {({ active }) => (
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            <p className="font-medium">{user?.fullName}</p>
                            <p className="text-gray-500">{user?.email}</p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block px-4 py-2 text-sm text-gray-700`}
                          >
                            Hồ sơ cá nhân
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? "bg-gray-100" : ""
                            } block w-full text-left px-4 py-2 text-sm text-gray-700`}
                          >
                            Đăng xuất
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
