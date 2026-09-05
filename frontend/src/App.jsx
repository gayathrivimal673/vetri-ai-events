import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import Gallery from "./pages/public/Gallery";
import Blog from "./pages/public/Blog";
import Contact from "./pages/public/Contact";
import Login from "./pages/public/Login";
import GetStarted from "./pages/public/GetStarted";

// Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// App Pages
import Events from "./pages/app/Events";
import EventDetails from "./pages/app/EventDetails";
import EventManager from "./pages/app/EventManager";
import Tasks from "./pages/app/Tasks";
import Calendar from "./pages/app/Calendar";
import AddSchedule from "./pages/app/AddSchedule";
import Vendors from "./pages/app/Vendors";
import VendorAssignments from "./pages/app/VendorAssignments";
import Guests from "./pages/app/Guests";
import AddGuest from "./pages/app/AddGuest";
import InvitationManagement from "./pages/app/InvitationManagement";
import WhatsAppRSVP from "./pages/app/WhatsAppRSVP";
import Budget from "./pages/app/Budget";
import Documents from "./pages/app/Documents";
import Media from "./pages/app/Media";
import EventDay from "./pages/app/EventDay";
import AIPlanner from "./pages/app/AIPlanner";
import AIChecklist from "./pages/app/AIChecklist";
import Crew from "./pages/app/Crew";
import Reports from "./pages/app/Reports";
import Settings from "./pages/app/Settings";
import Profile from "./pages/app/Profile";

function App() {
  return (
    <HashRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/blog" element={<Blog />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />

        <Route path="/get-started" element={<GetStarted />} />


        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/dashboard/events"
          element={<Events />}
        />

        <Route
          path="/dashboard/events/:id"
          element={<EventDetails />}
        />

        <Route
          path="/dashboard/event-manager"
          element={<EventManager />}
        />

        <Route
          path="/dashboard/tasks"
          element={<Tasks />}
        />

        <Route
          path="/dashboard/calendar"
          element={<Calendar />}
        />

        <Route
          path="/dashboard/calendar/add"
          element={<AddSchedule />}
        />

        <Route
          path="/dashboard/vendors"
          element={<Vendors />}
        />

        <Route
          path="/dashboard/vendor-assignments"
          element={<VendorAssignments />}
        />

        <Route
          path="/dashboard/crew"
          element={<Crew />}
        />

        <Route
          path="/dashboard/guests"
          element={<Guests />}
        />

        <Route
          path="/dashboard/guests/add"
          element={<AddGuest />}
        />

        <Route
          path="/dashboard/guests/invitations"
          element={<InvitationManagement />}
        />

        <Route
          path="/dashboard/guests/whatsapp"
          element={<WhatsAppRSVP />}
        />

        <Route
          path="/dashboard/budget"
          element={<Budget />}
        />

        <Route
          path="/dashboard/documents"
          element={<Documents />}
        />

        <Route
          path="/dashboard/media"
          element={<Media />}
        />

        <Route
          path="/dashboard/event-day"
          element={<EventDay />}
        />

        <Route
          path="/dashboard/ai-planner"
          element={<AIPlanner />}
        />

        <Route
          path="/dashboard/ai-checklist"
          element={<AIChecklist />}
        />

        <Route
          path="/dashboard/reports"
          element={<Reports />}
        />

        <Route
          path="/dashboard/settings"
          element={<Settings />}
        />

        <Route
          path="/dashboard/profile"
          element={<Profile />}
        />


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </HashRouter>
  );
}

export default App;