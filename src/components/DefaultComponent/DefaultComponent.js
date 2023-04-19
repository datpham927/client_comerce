import HeaderComponent from "../HeaderComponent/HeaderComponent";

function DefaultComponent({ children }) {
  return (
    <>
      <HeaderComponent />
      {children}
    </>
  );
}

export default DefaultComponent;
