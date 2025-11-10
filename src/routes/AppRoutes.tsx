import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PaymentVoucherPosting from "../pages/Dashboard/postings/paymentVoucherPosting/PaymentVoucherPosting";
import Layout from "../components/layout/Layout";
import PostingRoutes from "./PostingRoutes";
import GLAccountsRoutes from "./GLAccountsRoutes";
import CategoryAccountLink from "../pages/Dashboard/glAccounts/CategoryAccountLink";

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
        <Route index element={<Navigate to="/gl-accounts" replace />} />
        {/* Posting routes */}
        <Route path="postings" element={<PostingRoutes />}>
          <Route index element={<PaymentVoucherPosting />} />
          <Route path="pv-entry" element={<PaymentVoucherPostingCreate />} />
        </Route>
        {/* GL Accounts Routes */}
        <Route path="gl-accounts" element={<GLAccountsRoutes />}>
          <Route index element={<CategoryAccountLink />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
