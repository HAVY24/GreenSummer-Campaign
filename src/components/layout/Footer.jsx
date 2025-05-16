import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-2 md:mb-0">
            © {currentYear} Mùa Hè Xanh. Tất cả quyền được bảo lưu.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-green-600">
              Điều khoản
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-green-600">
              Quyền riêng tư
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-green-600">
              Liên hệ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
