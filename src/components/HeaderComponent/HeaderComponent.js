import { Link } from "react-router-dom";
import HeaderInput from "../HeaderInput/HeaderInput";
import HeaderRight from "../HeaderRight/HeaderRight";

function HeaderComponent() {
  return (
    <div className="flex bg-primary py-5  ">
      <Link to="/" className="w-2/12 text-center text-lg text-white">
        E-comerce
      </Link>
      <HeaderInput />
      <HeaderRight />
    </div>
  );
}

export default HeaderComponent;
