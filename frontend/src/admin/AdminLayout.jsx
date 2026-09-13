import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const CATEGORIZED_SECTIONS = [
  {
    category: "Navigation & Layout",
    items: [
      { key: "header", label: "Header / Navigation", icon: "🧭" },
      { key: "footer", label: "Footer Info", icon: "⚓" },
    ],
  },
  {
    category: "Standalone Pages",
    items: [
      { key: "aboutPage", label: "About Page", icon: "📖" },
      { key: "contactUs", label: "Contact Us Page", icon: "📞" },
      { key: "servicesPage", label: "Services Page", icon: "🛠️" },
      { key: "joinTeamPage", label: "Join Our Team (Careers)", icon: "💼" },
      { key: "blogs", label: "Blog Posts Hub", icon: "📰" },
      { key: "disclaimerPage", label: "Disclaimer", icon: "⚠️" },
      { key: "privacyPolicyPage", label: "Privacy Policy", icon: "🔒" },
      { key: "refundPolicyPage", label: "Refund & Cancellation Policy", icon: "💳" },
      { key: "shippingPolicyPage", label: "Shipping & Delivery Policy", icon: "🚚" },
      { key: "termsPage", label: "Terms & Conditions", icon: "📜" },
    ],
  },
  {
    category: "Main Landing Content",
    items: [
      { key: "hero", label: "Hero Banner", icon: "✨" },
      { key: "aboutUs", label: "About Us Story", icon: "🌿" },
      { key: "ayurvedaQuote", label: "Ayurveda Sutra", icon: "📜" },
      { key: "statsBar", label: "Stats Bar Counter", icon: "📊" },
    ],
  },
  {
    category: "Offerings & Pricing",
    items: [
      { key: "products", label: "Product Catalog", icon: "🥗" },
      { key: "plans", label: "Subscription Plans", icon: "📅" },
      { key: "howItWorks", label: "How It Works Steps", icon: "🔄" },
    ],
  },
  {
    category: "Engagement & Reviews",
    items: [
      { key: "testimonials", label: "Client Testimonials", icon: "💬" },
      { key: "faq", label: "FAQ", icon: "❓" },
      { key: "newsletter", label: "Newsletter Settings", icon: "📧" },
    ],
  },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Reset window scroll position on mount
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-[#fbf3e7] text-[#2b2b1f] p-6 gap-6 overflow-hidden">
      {/* Floating Left Sidebar */}
      <aside className="w-64 bg-white border border-[#eee3cf] rounded-3xl flex flex-col shrink-0 h-[calc(100vh-3rem)] shadow-sm overflow-y-auto scrollbar-thin">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[#eee3cf] flex items-center gap-3">
          <span className="text-2xl">🥦</span>
          <div className="text-left">
            <div className="text-base font-bold tracking-tight text-[#2f4a1f] font-display">Yogyahar CMS</div>
            <p className="text-[10px] text-[#6b6b5c]">Website Control Panel</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="px-6 py-6 flex flex-col gap-6 flex-1">
          {CATEGORIZED_SECTIONS.map((cat) => (
            <div key={cat.category} className="text-left">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a69d85] px-3 mb-2">
                {cat.category}
              </div>
              <ul className="flex flex-col gap-1">
                {cat.items.map((item) => (
                  <li key={item.key}>
                    <NavLink
                      to={`/admin/sections/${item.key}`}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#2f4a1f] text-white shadow-sm"
                            : "text-[#6b6b5c] hover:bg-[#fbf3e7]/80 hover:text-[#2f4a1f]"
                        }`
                      }
                    >
                      <span className="text-sm shrink-0">{item.icon}</span>
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#eee3cf] bg-[#fbf3e7]/20 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#eee3cf] hover:border-[#2f4a1f] bg-white hover:bg-[#fbf3e7]/40 text-xs font-bold text-[#6e2438] hover:text-[#2f4a1f] py-2.5 transition-all shadow-sm"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-[calc(100vh-3rem)] overflow-y-auto scrollbar-thin pr-1">
        <Outlet />
      </main>
    </div>
  );
}
