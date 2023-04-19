import { Dropdown } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/userSlice/userSlice";
import { logOut } from "../../service";

function HeaderRight() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const user = useSelector((state) => state.userReduce);
  const order = useSelector((state) => state?.orderReduce);
  const handleLogOut = async () => {
    const response = await logOut();
    if (response.status === "OK") {
      localStorage.clear();
      dispatch(resetUser());
      navigate("/");
    }
  };
  useEffect(() => {
    setName(user?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.name]);

  const items = [
    {
      label: <Link to={"/profile"}>Thông tin người dùng</Link>,
    }, {
      label: <Link to={"/my-order"}>Đơn hàng của tôi</Link>,
    },
    {
      label: user?.isAdmin && (
        <Link to={"/system/admin"}>Quản lý người dùng</Link>
      ),
    },
  ];

  return (
    <div className="flex w-3/12 ml-4">
      <div className="flex items-center text-white">
        {user?.avatar ? (
          <img
            className="w-[40px] h-[40px] rounded-[50%]"
            src={user?.avatar}
            alt=""
          />
        ) : (
          <svg
            fontSize={"50px"}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}

        <div className="mx-2">
          {!user?.email ? (
            <>
              <div className="text-sm ">
                <Link to={"/sign-up"}>Đăng nhập</Link>/
                <Link to={"/sign-in"}>Đăng ký</Link>
              </div>
              <Link to={"/account"}>Tài khoản</Link>
            </>
          ) : (
            <>
              <Dropdown
                menu={{
                  items,
                }}
                placement="topRight"
                arrow
              >
                <div className="text-sm cursor-pointer " onClick={handleLogOut}>
                  {name
                    ? name
                    : user?.email
                      ? user?.email.split("@")[0]
                      : "user"}
                </div>
              </Dropdown>
            </>
          )}
        </div>
      </div>
      <Link className="flex items-end ml-2 text-white" to={"/order"}>
        <div className="relative">
          <img
            className="w-[40px] "
            src="https://salt.tikicdn.com/ts/upload/40/44/6c/b80ad73e5e84aeb71c08e5d8d438eaa1.png"
            alt=""
          />
          <span className="absolute top-0 right-0  py-[2px]  px-[5px] bg-red rounded-full text-[10px]">
            {order?.orderItems?.length > 0 ? order?.orderItems?.length : 0}
          </span>
        </div>
        <span className="text-sm ">Giỏ hàng</span>
      </Link>
    </div>
  );
}

export default HeaderRight;
