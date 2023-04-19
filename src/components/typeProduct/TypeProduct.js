import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTypeName } from "../../redux/productSlice/productSlice";

function TypeProduct({ name }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnclick = (type) => {
    dispatch(setTypeName(type));
    navigate(
      `/products/${type
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replaceAll(" ", "-")}`,
      { state: type }
    );
  };

  return (
    <div
      onClick={() => handleOnclick(name)}
      className="text-sm mx-3 my-2 cursor-pointer hover:text-primary"
    >
      {name}
    </div>
  );
}

export default TypeProduct;
