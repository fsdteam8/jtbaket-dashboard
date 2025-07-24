import React from "react";
import EditCategoryHeader from "../_components/edit-category-header";
import EditCategoryForm from "../_components/edit-category-form";

const EditCategoryPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <EditCategoryHeader categoryId={params.id} />
      <EditCategoryForm categoryId={params.id} />
    </div>
  );
};

export default EditCategoryPage;
