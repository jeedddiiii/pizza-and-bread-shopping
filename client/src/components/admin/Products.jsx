import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        {/* <div class="d-flex justify-content-between"> */}
          <h2>
        Products
        </h2>
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Create
        </PrimaryButton>
        
      </AdminHeaders>
      <Outlet />
    </>
  );
};

export default Products;
