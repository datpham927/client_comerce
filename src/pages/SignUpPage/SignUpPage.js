import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../service";

function SignUpPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const [textForm, setTextForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const { email, password, confirm } = textForm;
  const changeInput = (e) => {
    setTextForm({ ...textForm, [e.target.name]: e.target.value });
  };

  const handleSummitSignUp = async (e) => {
    e.preventDefault();
    const data = await postRegister(textForm);
    setData(data);
    if (data.status === "ERR") {
      return;
    }
    navigate("/sign-in");
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className="bg-white w-[350px] p-4 rounded-md">
        <h1 className="text-3xl">Xin chào</h1>
        <h3>Đăng nhập vào tài khoản</h3>
        <form className="my-5" onSubmit={handleSummitSignUp}>
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
            name="password"
            value={password}
            onChange={changeInput}
            required
          />
          <input
            className="outline-none bg-cyan-100 w-full p-1  my-2"
            placeholder="12345"
            type="text"
            name="confirm"
            value={confirm}
            onChange={changeInput}
            required
          />
          {data.status === "ERR" && (
            <span className="h-10 text-primary">{data.message}</span>
          )}
          <button className="w-full mt-6 py-1  rounded-sm mx-auto bg-red text-white font-normal">
            Đăng ký
          </button>
        </form>

        <div className="flex text-sm my-2">
          <span className="mr-1">Đã có tài khoản?</span>
          <Link className="text-primary cursor-pointer" to="/sign-in">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
