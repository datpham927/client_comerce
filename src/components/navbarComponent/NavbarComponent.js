import { useEffect, useState } from "react";
import { getAllType } from "../../service";
import TypeProduct from "../typeProduct/TypeProduct";

function NavbarComponent() {
  const [typeProducts, setTypeProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllType();
      setTypeProducts(res);
    };
    fetchApi();
  }, []);
  return (
    <div className="p-4 bg-white">
      <h1 className="my-4">Sản phẩm</h1>
      <ul>
        {typeProducts?.map((e) => (
          <TypeProduct name={e} />
        ))}
      </ul>
    </div>
  );
}

export default NavbarComponent;
