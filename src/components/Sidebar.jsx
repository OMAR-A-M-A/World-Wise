import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>
      <Outlet />
      <Footer></Footer>
    </aside>
  );
}

export default Sidebar;
