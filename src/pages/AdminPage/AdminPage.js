import { Menu } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminUser from "../../components/AdminUser/AdminUser";
import { resetUser } from "../../redux/userSlice/userSlice";
import { logOut } from "../../service";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Trang chủ", "home"),
  getItem("Người dùng", "user"),
  getItem("Sản phẩm", "product"),
];

const AdminPage = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  const renderPage = (key) => {
    switch (key) {
      case "home": {
        navigate("/");
        return;
      }
      case "user": {
        return <AdminUser />;
      }
      case "product": {
        return <AdminProduct />;
      }
      default:
        return <></>;
    }
  };

  const onOpenChange = (e) => {
    setKey(e[0]);
  };

  const onClick = (e) => {
    setKey(e.key);
  };
  return (
    <div className="flex">
      <div className="w-[256px] h-screen bg-white">
        <Menu
          mode="inline"
          items={items}
          onOpenChange={onOpenChange}
          onClick={onClick}
        />
      </div>
      {renderPage(key)}
    </div>
  );
};
export default AdminPage;
