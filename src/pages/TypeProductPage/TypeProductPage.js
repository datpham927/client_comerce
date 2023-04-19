import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardComponent from "../../components/cardComponent/CartComponent";
import NavbarComponent from "../../components/navbarComponent/NavbarComponent";
import { getAllProduct } from "../../service";

function TypeProductPage() {
  const location = useLocation();
  const typeName = location.state;
  const [data, setData] = useState({});
  const [page, setPage] = useState(0);
  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllProduct(
        `?filter=type&filter=${typeName}&limit=8&page=${page}`
      );
      setData(data);
    };
    fetchApi();
  }, [typeName, page]);

  return (
    <div className="m-4 flex">
      <div className="w-[20%]">
        <NavbarComponent />
      </div>
      <div className="w-[80%]">
        <div className="grid grid-cols-4 pl-4">
          {data?.products?.map((e) => (
            <CardComponent data={e} />
          ))}
        </div>
        {data?.total > 1 && (
          <div className="flex justify-center my-4">
            <Pagination
              defaultCurrent={1}
              onChange={(e) => {
                setPage(e - 1);
              }}
              total={data?.total}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TypeProductPage;
