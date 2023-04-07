import { Outlet, useNavigate } from "react-router-dom";
import { AdminHeaders, PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <div class="d-flex justify-content-between">
          <div>
        Products
        </div>
        <div >
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Create
        </PrimaryButton>
        <Outlet />
        </div>
        </div>
      </AdminHeaders>
    </>
  );
};

export default Products;
