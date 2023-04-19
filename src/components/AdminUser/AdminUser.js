import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Space, Tag } from "antd";
import { getAllUser } from "../../service";
import TableComponent from "../TableComponent/TableComponent";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => (
      <>
        <Checkbox></Checkbox> <a>{text}</a>
      </>
    ),
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <div>
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
        <div>
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
      </Space>
    ),
  },
];

function AdminUser() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [stateUser, setStateUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    const fetchApi = async () => {
      const data = await getAllUser();
      setData(data?.data);
    };
    fetchApi();
  }, []);

  const handleChange = (e) => {
    setStateUser({ ...stateUser, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const file = e.target.files;
    setAvatar(URL.createObjectURL(file[0]));
  };
  const handleSummit = () => {};

  const users = data.map((e) => {
    return { ...e, key: e._id };
  });
  return (
    <div className="w-full h-screen">
      <h1 className="text-1xl text-primary m-5 ">Quản lý người dùng</h1>
      <div className="w-[100px] h-[100px] flex  justify-center items-center border-solid border-[1px] ml-5 border-primary">
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
            <Input value={stateUser.name} onChange={handleChange} name="name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input
              value={stateUser.email}
              onChange={handleChange}
              name="email"
            />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <Input
              value={stateUser.phone}
              onChange={handleChange}
              name="phone"
            />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input value={avatar} onChange={handleImage} name="avatar" />
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
        <TableComponent columns={columns} data={users} />
      </div>
    </div>
  );
}

export default AdminUser;
