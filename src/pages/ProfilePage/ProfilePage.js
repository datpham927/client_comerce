import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateUser } from "../../redux/userSlice/userSlice";
import { updateUser } from "../../service";

function ProfilePage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector((state) => state.userReduce);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [textForm, setTextForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [avatar, setAvatar] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setTextForm({
      name: user.name,
      phone: user.phone,
      address: user.address,
    });
    setAvatar(user.avatar);
  }, [user]);

  const { name, phone, address } = textForm;
  const changeInput = (e) => {
    setTextForm({ ...textForm, [e.target.name]: e.target.value });
  };

  const handleSummit = async (e) => {
    e.preventDefault();
    const response = await updateUser(
      user.id,
      { ...textForm, avatar },
      user?.access_token
    );
    if (response?.status === "OK") {
      dispatch(setUpdateUser({ ...response.data }));
      alert(response.message);
    }
  };

  function handleImageUpload(event) {
    const file = event.target.files;
    setAvatar(URL.createObjectURL(file[0]));
  }
  return (
    <div className="w-[50%] mx-auto">
      <form className="my-5" onSubmit={handleSummit}>
        <div className="flex items-center">
          <label htmlFor="name" className="mx-3 w-[10%]">
            name
          </label>
          <input
            id="name"
            className="outline-none  bg-blue-400 opa w-full p-1 my-2"
            type="text"
            name="name"
            value={name}
            onChange={changeInput}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="phone" className="mx-3 w-[10%]">
            phone
          </label>
          <input
            id="phone"
            className="outline-none  bg-blue-400 w-full p-1 my-2"
            type="text"
            name="phone"
            value={phone}
            onChange={changeInput}
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="avatar" className="mx-3 w-[10%]">
            avatar
          </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <img
            className="w-[60px] h-[60px] object-cover "
            src={avatar}
            alt=""
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="address" className="mx-3 w-[10%]">
            address
          </label>
          <input
            id="address"
            className="outline-none  bg-blue-400 w-full p-1 my-2"
            type="text"
            name="address"
            value={address}
            onChange={changeInput}
          />
        </div>
        <button className="flex w-[30%] justify-center mx-auto mt-6 py-1  rounded-sm mx-aut bg-pink-400 text-white font-normal">
          Cập Nhật
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
