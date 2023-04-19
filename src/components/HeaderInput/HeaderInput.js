function HeaderInput() {
  return (
    <div className="w-7/12 flex  rounded-sm overflow-hidden ">
      <input
        className="h-[40px] flex-1 outline-none px-5"
        type="text"
        placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
      />
      <button className="flex items-center bg-blue-600 px-3">
        <img
          className="w-[20px] mx-3"
          src="https://salt.tikicdn.com/ts/upload/ed/5e/b8/8538366274240326978318348ea8af7c.png"
          alt="search"
        />

        <span>search</span>
      </button>
    </div>
  );
}

export default HeaderInput;
