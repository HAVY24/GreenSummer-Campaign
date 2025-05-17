import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCampaigns } from "../api/campaigns";
import { getActivitiesCount } from "../api/activities";
import { getMembersCount } from "../api/members";
import { getTasksCount } from "../api/tasks";
import CampaignCard from "../components/campaigns/CampaignCard";
import Navbar from "../components/layout/Navbar";

const Home = () => {
  const [featuredCampaigns, setFeaturedCampaigns] = useState([]);
  const [stats, setStats] = useState({
    campaigns: 0,
    activities: 0,
    members: 0,
    tasks: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch featured campaigns (ongoing)
        const campaignsData = await getCampaigns();
        const ongoingCampaigns = campaignsData
          .filter((campaign) => campaign.status === "ongoing")
          .slice(0, 3);
        setFeaturedCampaigns(ongoingCampaigns);

        // Fetch stats
        const [activitiesCount, membersCount, tasksCount] = await Promise.all([
          getActivitiesCount(),
          getMembersCount(),
          getTasksCount(),
        ]);

        setStats({
          campaigns: campaignsData.length,
          activities: activitiesCount.count,
          members: membersCount.count,
          tasks: tasksCount.count,
        });
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Mùa Hè Xanh</h1>
            <p className="text-xl mb-8">
              Chung tay xây dựng môi trường xanh, sạch, đẹp và bền vững
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/campaigns"
                className="bg-white text-green-600 hover:bg-green-100 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Khám phá chiến dịch
              </Link>
              <Link
                to="/auth/login"
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Tham gia ngay
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {stats.campaigns}
            </h3>
            <p className="text-gray-600">Chiến dịch</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {stats.activities}
            </h3>
            <p className="text-gray-600">Hoạt động</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.members}</h3>
            <p className="text-gray-600">Thành viên</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-2xl font-bold text-green-600">{stats.tasks}</h3>
            <p className="text-gray-600">Nhiệm vụ</p>
          </div>
        </div>

        {/* Featured Campaigns */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Chiến dịch nổi bật
            </h2>
            <Link to="/campaigns" className="text-green-600 hover:text-green-700">
              Xem tất cả
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
            </div>
          ) : featuredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map((campaign) => (
                <CampaignCard key={campaign._id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">Không có chiến dịch nổi bật nào.</p>
              <Link
                to="/campaigns"
                className="inline-block mt-4 text-green-600 hover:text-green-700"
              >
                Xem tất cả chiến dịch
              </Link>
            </div>
          )}
        </section>

        {/* About Section */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Về Mùa Hè Xanh
            </h2>
            <p className="text-gray-600 mb-4">
              Mùa Hè Xanh là một chương trình tình nguyện hè dành cho sinh viên,
              được tổ chức nhằm mục đích đóng góp cho cộng đồng, xây dựng môi
              trường xanh - sạch - đẹp, và phát triển kỹ năng làm việc nhóm cũng
              như tinh thần tình nguyện cho các bạn sinh viên.
            </p>
            <p className="text-gray-600">
              Mỗi chiến dịch Mùa Hè Xanh tập trung vào nhiều hoạt động khác nhau
              như trồng cây xanh, dọn dẹp môi trường, tặng quà cho trẻ em có hoàn
              cảnh khó khăn, xây dựng cơ sở vật chất cho các vùng nông thôn, và
              nhiều hoạt động có ý nghĩa khác.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="bg-green-100 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Sẵn sàng tham gia cùng chúng tôi?
            </h2>
            <p className="text-green-700 mb-6">
              Đăng ký tham gia các chiến dịch và cùng nhau tạo nên những thay đổi
              tích cực cho cộng đồng!
            </p>
            <Link
              to="/auth/register"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Đăng ký ngay
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
