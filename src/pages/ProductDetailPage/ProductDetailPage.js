import { Link } from "react-router-dom";

import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

function ProductDetailPage() {
  return (
    <div>
      <Link to="/">Trang chủ</Link>
      <ProductDetailComponent />
    </div>
  );
}

export default ProductDetailPage;
