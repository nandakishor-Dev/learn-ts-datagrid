import React from "react";
import { Route, Routes } from "react-router-dom";
import PaymentVoucherPosting from "../pages/Dashboard/postings/paymentVoucherPosting/PaymentVoucherPosting";
import Layout from "../components/layout/Layout";
import PostingRoutes from "./PostingRoutes";

const PaymentVoucherPostingCreate = React.lazy(
  () =>
    import(
      "../pages/Dashboard/postings/paymentVoucherPosting/PaymentVoucherPostingCreate"
    )
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="postings" element={<PostingRoutes />}>
          <Route index element={<PaymentVoucherPosting />} />
          <Route path="pv-entry" element={<PaymentVoucherPostingCreate />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
