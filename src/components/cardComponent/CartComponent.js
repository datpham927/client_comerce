import { useNavigate } from "react-router-dom";

function CardComponent({ data }) {
  const navigate = useNavigate();

  const handleOnclick = (id) => {
    navigate(`/product-detail`, { state: id });
  };

  return (
    <div
      className="hover:shadow-card p-4"
      onClick={() => handleOnclick(data._id)}
    >
      <img src={data?.image} alt="" />
      <div className="text-overflow text-sm">{data?.name}</div>
      <div className="flex justify-between mx-2 mt-2">
        <div className="flex text-sm">
          <span>{data?.rating}</span>
          <span className="text-amber-300 mx-2">
            <ion-icon
              name="star"
              role="img"
              class="md hydrated"
              aria-label="star"
            ></ion-icon>
          </span>
        </div>
        <div className="text-xs text-primary">đã bán {data?.sold}</div>
      </div>

      <div className="flex items-center text-red">
        <span className="text-base font-medium "> {data?.price}đ</span>
        <span className="text-xs  ml-2">-{data?.discount}%</span>
      </div>
    </div>
  );
}

export default CardComponent;
