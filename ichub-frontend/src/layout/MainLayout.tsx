import { Outlet } from "react-router-dom";

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

function MainLayout() {
  return (
    <main>
      <Header />
      <div className="pageWrapper d-lg-flex">
        <aside className="sidebarArea shadow bg-white" id="sidebarArea">
          <Sidebar />
        </aside>
        <div className="contentArea">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default MainLayout