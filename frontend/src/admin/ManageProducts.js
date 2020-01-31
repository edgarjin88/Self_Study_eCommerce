import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./ApiAdmin";
import Search from "../core/Search";


const ManageProducts = () => {
  return (
    <Layout
      title="Manage Products"
      description="Perform CRUD on products"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Manage Products</h2>
      <div className="row">
        <div>...</div>
      </div>
    </Layout>
  );
};

export default ManageProducts