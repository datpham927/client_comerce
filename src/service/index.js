import axios from "axios";
import httpRequest from "../utils/httpRequest";

export const axiosJWT = axios.create({
  baseURL: "https://backend-comerce.onrender.com/api",
});

const postRegister = async (form) => {
  try {
    const response = await httpRequest.post("/user/sign-up", { ...form });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postLogin = async (form) => {
  try {
    const response = await httpRequest.post("/user/sign-in", { ...form });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (id) => {
  try {
    const response = await httpRequest.delete("/user/delete-user/" + id);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (id, data, token) => {
  try {
    const response = await axiosJWT.put("/user/update-user/" + id, data, {
      headers: {
        token: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getDetailUser = async (id, token) => {
  try {
    const response = await axiosJWT.get("/user/get-detail/" + id, {
      headers: {
        token: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllUser = async (id, token) => {
  try {
    const response = await axiosJWT.get("/user/getall", {
      headers: {
        token: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const refreshToken = async () => {
  try {
    const response = await httpRequest.post("/user/refresh-token", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const logOut = async () => {
  try {
    const response = await httpRequest.post("/user/log-out");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async (query) => {
  try {
    const response = await httpRequest.get(
      `/product/getall${query ? query : ""}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const createProduct = async (data) => {
  try {
    const response = await httpRequest.put("/product/create", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getDetailProduct = async (id) => {
  try {
    const response = await httpRequest.get(`/product/detail/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const updateProduct = async (id, data) => {
  try {
    const response = await httpRequest.put(`/product/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (id) => {
  try {
    const response = await httpRequest.delete(`/product/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllType = async () => {
  try {
    const response = await httpRequest.get(`/product/get-all-type`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const OrderCreate = async (data, token) => {
  try {
    const response = await httpRequest.put(`order/create`, data, {
      headers: {
        token: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getAllOrder = async (token) => {
  try {
    const response = await httpRequest.get(`order/all`, {
      headers: {
        token: `bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getDetailOrder = async (token, id) => {
  try {
    console.log("id", id)
    const response = await httpRequest.get(`order/detail/${id}`, {
      headers: {
        token: `bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
const deleteOrder = async (token, order) => {
  try {
    const response = await httpRequest.delete(`order/delete`, {
      data: order,
      headers: {
        token: `bearer ${token}`,
      }
    })

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export {
  postLogin,
  postRegister,
  deleteUser,
  updateUser,
  getDetailUser,
  refreshToken,
  logOut,
  getAllUser,
  getAllProduct,
  createProduct,
  getDetailProduct,
  updateProduct,
  deleteProduct,
  getAllType,
  OrderCreate,
  getAllOrder,
  getDetailOrder, deleteOrder
};
