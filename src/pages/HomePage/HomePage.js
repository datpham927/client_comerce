import { useEffect, useState } from "react";
import CardComponent from "../../components/cardComponent/CartComponent";
import SliderComponent from "../../components/sliderComponent/SliderComponent";
import TypeProduct from "../../components/typeProduct/TypeProduct";
import { getAllProduct, getAllType } from "../../service";

function HomePage() {
  const arrImg = [
    "https://salt.tikicdn.com/cache/w1080/ts/banner/06/c5/d0/16f41207ab74b71181a48ce258c2d93d.png",
    "https://salt.tikicdn.com/cache/w1080/ts/banner/c4/d4/8c/e4488322fd94089a5336cbf2cf8195ea.png",
  ];
  const [dataProducts, setDataProducts] = useState({});
  const [typeProducts, setTypeProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getAllType();
      setTypeProducts(res || []);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllProduct(`?limit=${6 * page}`);
      setDataProducts(data);
    };

    fetchApi();
  }, [page]);
  return (
    <div className="px-5">
      <div className="flex">
        {/* {typeProducts && typeProducts?.map((i) => (
          <TypeProduct key={i} name={i} />
        ))} */}
      </div>
      <div>
        <SliderComponent arrImg={arrImg} />
      </div>
      {dataProducts?.total !== 0 && (
        <>
          <div className="grid grid-cols-6 mt-5">
            {dataProducts?.products?.map((e) => (
              <CardComponent data={e} />
            ))}
          </div>
          {page <= dataProducts?.totalPage + 1 && (
            <div className="w-full flex justify-center my-3">
              <button
                onClick={() => setPage(page + 1)}
                className="w-[240px] py-1 text-primary border-solid  border-[1px] border-primary rounded-sm mx-auto hover:bg-primary hover:text-white"
              >
                Xem thêm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
