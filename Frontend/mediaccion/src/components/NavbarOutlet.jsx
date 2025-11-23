import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx'
import StickyButton from "../components/StickyButton.jsx";

export default function LayoutConNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
      <StickyButton />
    </>
  );
}