import AdminPage from "../pages/AdminPage/AdminPage";
import { DetailOrderPost } from "../pages/DetailOrderPost/DetailOrderPost";
import HomePage from "../pages/HomePage/HomePage";
import { MyOrder } from "../pages/MyOrder/MyOrder";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OderPage/OderPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

const routes = [
  {
    path: "/",
    page: HomePage,
    isHeaderPage: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isHeaderPage: true,
  },
  {
    path: "/my-order",
    page: MyOrder,
    isHeaderPage: true,
  },
  {
    path: "/order-success",
    page: OrderSuccess,
    isHeaderPage: true,
  }, {
    path: "/order-detail",
    page: DetailOrderPost,
    isHeaderPage: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isHeaderPage: true,
  },
  {
    path: "/products/:name",
    page: TypeProductPage,
    isHeaderPage: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isHeaderPage: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isHeaderPage: false,
  },
  {
    path: "/product-detail",
    page: ProductDetailPage,
    isHeaderPage: true,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isHeaderPage: true,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isHeaderPage: false,
    isPrivate: true,
  },
  {
    path: "*",
    page: HomePage,
  },
];

export default routes;
