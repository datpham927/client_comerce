import { Table } from "antd";

const TableComponent = ({ columns, data, onRow }) => (
  <Table columns={columns} dataSource={data} onRow={onRow} />
);
export default TableComponent;
