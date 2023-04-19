import { Checkbox, Drawer, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getDetailProduct,
  updateProduct,
} from "../../service";
import TableComponent from "../TableComponent/TableComponent";

function AdminProduct() {
  const [data, setData] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const [image, setImage] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
  });
  const [stateDetailProduct, setStateDetailProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    description: "",
    rating: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [open, setOpen] = useState(false);

  //chi tiết sản phẩm
  useEffect(() => {
    if (idProduct) {
      const fetchApi = async () => {
        const data = await getDetailProduct(idProduct);
        const { name, image, type, price, countInStock, description, rating } =
          data?.product;
        setStateDetailProduct({
          name,
          image,
          type,
          price,
          countInStock,
          description,
          rating,
        });
      };
      fetchApi();
    }
  }, [idProduct]);
  const showDrawer = () => {
    setOpen(true);
  };
  const handleSummitEdit = async () => {
    await updateProduct(idProduct, { ...stateDetailProduct, imageEdit });
    setOpen(false);
    setLoadData(true);
  };
  const handleDelete = async () => {
    const data = await deleteProduct(idProduct);
    setLoadData(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => (
        <>
          <Checkbox></Checkbox> <a>{text}</a>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>

          <div onClick={showDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </div>
          <Modal
            title="Chỉnh sửa sản phẩm"
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSummitEdit}
              autoComplete="off"
            >
              <Form.Item label="Name" name="name">
                <Input
                  value={stateDetailProduct.name}
                  name="name"
                  onChange={handleChangeEdit}
                />
              </Form.Item>

              <Form.Item label="type" name="type">
                <Input
                  value={stateDetailProduct.type}
                  name="type"
                  onChange={handleChangeEdit}
                />
              </Form.Item>
              <Form.Item label="price" name="price">
                <Input
                  value={stateDetailProduct.price}
                  name="price"
                  onChange={handleChangeEdit}
                />
              </Form.Item>
              <Form.Item label="count InStock" name="countInStock">
                <Input
                  value={stateDetailProduct.countInStock}
                  onChange={handleChangeEdit}
                  name="countInStock"
                />
              </Form.Item>
              <Form.Item label="rating" name="rating">
                <Input
                  value={stateDetailProduct.rating}
                  onChange={handleChangeEdit}
                  name="rating"
                />
              </Form.Item>
              <Form.Item label="description" name="description">
                <Input
                  value={stateDetailProduct.description}
                  name="description"
                  onChange={handleChangeEdit}
                />
              </Form.Item>
              <Form.Item label="image" name="image">
                <Input
                  type="file"
                  value={stateDetailProduct.image}
                  name="image"
                  onChange={handleImageEdit}
                />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllProduct();
      setData(data?.products);
      setLoadData(false);
    };
    fetchApi();
  }, [loadData]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setStateProduct({
      name: "",

      type: "",
      price: "",
      countInStock: "",
      description: "",
      rating: "",
    });
    setIsModalOpen(false);
    setOpen(false);
  };

  const handleChange = (e) => {
    setStateProduct({ ...stateProduct, [e.target.name]: e.target.value });
  };

  const handleChangeEdit = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSummit = async () => {
    const data = await createProduct({ ...stateProduct, image });
    if (data.status === "OK") {
      setLoadData(true);
      setIsModalOpen(false);
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        description: "",
        rating: "",
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files;
    setImage(URL.createObjectURL(file[0]));
  };
  const handleImageEdit = (e) => {
    const file = e.target.files;
    setImageEdit(URL.createObjectURL(file[0]));
  };
  const products = data.map((e) => {
    return { ...e, key: e._id };
  });
  const [form] = Form.useForm();
  return (
    <div className="w-full  h-screen">
      <h1 className="text-1xl text-primary m-5 ">Quản lý sản phẩm</h1>

      <div
        onClick={showModal}
        className="w-[100px] h-[100px] flex my-4 justify-center items-center border-solid border-[1px] ml-5 border-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>

      <Modal title="Chỉnh sửa sản phẩm" open={isModalOpen}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSummit}
          autoComplete="off"
        >
          <Form.Item label="Name" name="name">
            <Input
              value={stateProduct.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Input
              value={stateProduct.type}
              name="type"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="price" name="price">
            <Input
              value={stateProduct.price}
              name="price"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="count InStock" name="countInStock">
            <Input
              value={stateProduct.countInStock}
              onChange={handleChange}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item label="rating" name="rating">
            <Input
              value={stateProduct.rating}
              onChange={handleChange}
              name="rating"
            />
          </Form.Item>
          <Form.Item label="description" name="description">
            <Input
              value={stateProduct.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="image" name="image">
            <Input
              type="file"
              value={stateProduct.image}
              name="image"
              onChange={handleImage}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* ----------- */}
      <div>
        <TableComponent
          columns={columns}
          data={products}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setIdProduct(record._id);
              },
            };
          }}
        />
      </div>
    </div>
  );
}

export default AdminProduct;
