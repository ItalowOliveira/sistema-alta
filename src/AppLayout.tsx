// Layout com Navbar e Sidebar
import { Outlet } from "react-router-dom";
import Navbar from "./componentes/toolbars/navbar";
import SidebarLayout from "./componentes/toolbars/sidebar";

export function AppLayout() {
  return (
    <>
      <Navbar />
      <SidebarLayout />
      <main className="ml-64 mt-20 p-4">
        <Outlet />
      </main>
    </>
  );
}
