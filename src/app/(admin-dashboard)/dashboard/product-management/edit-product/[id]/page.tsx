import React from "react";
import EditProductHeader from "../_components/edit-product-header";
import EditProductForm from "../_components/edit-product-form";

const EditProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EditProductHeader productId={params.id} />
      <EditProductForm productId={params.id} />
    </div>
  );
};

export default EditProductPage;
