import { Fragment, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import routes from "./routes";
import { axiosJWT, getDetailUser, refreshToken } from "./service";
import { setUpdateUser } from "./redux/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReduce);
  useEffect(() => {
    const { storageData, decoded } = handleDecode();
    const { id } = decoded;
    const fetchData = async () => {
      const detailUser = await getDetailUser(id, storageData);
      dispatch(setUpdateUser({ ...detailUser?.data, token: storageData }));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecode = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData) {
      storageData = JSON.parse(localStorage.getItem("access_token"));
      decoded = jwt_decode(storageData);
    }
    return { storageData, decoded };
  };

  //hết hạn token
  axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecode();
      const currentTime = new Date();
      if (decoded.exp < currentTime.getTime() / 1000) {
        const data = await refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return (
    <BrowserRouter>
      <Routes>
        {routes?.map((route) => {
          const Page = route.page;

          const check = !route.isPrivate || user?.isAdmin;
          const Layout = route.isHeaderPage ? DefaultComponent : Fragment;
          return (
            <Route
              key={route.path}
              path={check ? route.path : ""}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
