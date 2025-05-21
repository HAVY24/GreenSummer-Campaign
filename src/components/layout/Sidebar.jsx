import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  ClipboardListIcon,
  BadgeCheckIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Define navigation items based on user role
  const navigation = [
    { name: "Trang chủ", href: "/", icon: HomeIcon },
    { name: "Chiến dịch", href: "/campaigns", icon: BadgeCheckIcon },
    { name: "Hoạt động", href: "/activities", icon: CalendarIcon },
    { name: "Thành viên", href: "/members", icon: UserGroupIcon },
    { name: "Nhiệm vụ", href: "/tasks", icon: ClipboardListIcon },
  ];

  // Add admin settings if user is admin
  if (user?.role === "admin") {
    navigation.push({ name: "Quản lý", href: "/admin", icon: CogIcon });
  }

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <span className="text-lg font-bold text-green-600">
                    Mùa Hè Xanh
                  </span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${location.pathname === item.href
                        ? "bg-green-100 text-green-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                      onClick={() => setOpen(false)}
                    >
                      {item.icon && (
                        <item.icon
                          className={`${location.pathname === item.href
                            ? "text-green-500"
                            : "text-gray-400 group-hover:text-gray-500"
                            } mr-4 flex-shrink-0 h-6 w-6`}
                          aria-hidden="true"
                        />
                      )}
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <Link to="/profile" className="flex-shrink-0 group block">
                  <div className="flex items-center">
                    <div>
                      <div className="h-9 w-9 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-semibold">
                        {user?.fullName?.charAt(0) ||
                          user?.username?.charAt(0) ||
                          "U"}
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.fullName}
                      </p>
                      <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                        {user?.role === "admin"
                          ? "Quản trị viên"
                          : user?.role === "leader"
                            ? "Trưởng nhóm"
                            : "Tình nguyện viên"}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <span className="text-lg font-bold text-green-600">
                  Mùa Hè Xanh
                </span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${location.pathname === item.href
                      ? "bg-green-100 text-green-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                  >
                    {item.icon && (
                      <item.icon
                        className={`${location.pathname === item.href
                          ? "text-green-500"
                          : "text-gray-400 group-hover:text-gray-500"
                          } mr-4 flex-shrink-0 h-6 w-6`}
                        aria-hidden="true"
                      />
                    )}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <Link to="/profile" className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div>
                    <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-semibold">
                      {user?.fullName?.charAt(0) ||
                        user?.username?.charAt(0) ||
                        "U"}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {user?.fullName}
                    </p>
                    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                      {user?.role === "admin"
                        ? "Quản trị viên"
                        : user?.role === "leader"
                          ? "Trưởng nhóm"
                          : "Tình nguyện viên"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
