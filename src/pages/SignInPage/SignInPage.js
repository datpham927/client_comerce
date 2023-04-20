import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { getDetailUser, postLogin } from "../../service";
import { setUpdateUser } from "../../redux/userSlice/userSlice";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [textForm, setTextForm] = useState({
    email: "",
    password: "",
  });
  const location = useLocation();
  const [data, setData] = useState({});
  const { email, password } = textForm;
  const changeInput = (e) => {
    setTextForm({ ...textForm, [e.target.name]: e.target.value });
  };

  const handleSummitSignIn = async (e) => {
    e.preventDefault();
    const user = await postLogin(textForm);
    setData(user);
    if (user?.status === "ERR") {
      return;
    }
    const token = user?.access_token;
    localStorage.setItem("access_token", JSON.stringify(token));
    //lấy ra id từ access token bằng jwt-decode
    if (token) {
      const { id } = jwt_decode(token);
      //gọi api lấy chi tiết user
      if (id) {
        const detailUser = await getDetailUser(id, token);
        dispatch(setUpdateUser({ ...detailUser.data, token }));
      }
    }
    if (location?.state) {
      navigate(`/product-detail`, { state: location?.state });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="bg-white w-[350px] p-4 rounded-md">
        <h1 className="text-3xl">Xin chào</h1>
        <h3>Đăng nhập vào tài khoản</h3>
        <form className="my-5" onSubmit={handleSummitSignIn}>
          <input
            className="outline-none bg-cyan-100 w-full p-1 my-2"
            placeholder="datp927@gmail.com"
            type="text"
            name="email"
            value={email}
            onChange={changeInput}
            required
          />
          <input
            className="outline-none bg-cyan-100 w-full p-1  my-2"
            placeholder="12345"
            type="text"
            value={password}
            name="password"
            onChange={changeInput}
            required
          />
          {data.status === "ERR" && (
            <span className="h-10 text-primary">{data.message}</span>
          )}
          <button className="w-full mt-6 py-1  rounded-sm mx-auto bg-red text-white font-normal">
            Đăng nhập
          </button>
        </form>

        <div className="text-sm">Quên mặt khẩu</div>
        <div className="flex text-sm my-2">
          <span className="mr-1">Chưa có tài khoản?</span>
          <Link className="text-primary cursor-pointer" to="/sign-up">
            tạo tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
