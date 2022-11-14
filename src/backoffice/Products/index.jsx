import { Button, Box, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import AdminTheme from '../acomponents/AdminTheme'
import CTables from '../acomponents/CTables'
import CToaster from '../acomponents/CToaster';
import { adminListAllProducts } from '../../actions/Products';
import Loader from '../acomponents/Loader';


const ListProducts = () => {
  const dispatch = useDispatch();
  const pAData = useSelector(state => state?.productsApi);
  const [updatePageCnt, setUpdatePageCnt] = useState(pAData?.productListData?.data?.currentPage);
  const [showT, setShowT] = useState(0);

  useEffect(() => {
    var newPage = (updatePageCnt == undefined) ? 0 : updatePageCnt;
    let fData = {
      'selected': '?page=' + newPage + '&rl=Admin'
    }
    dispatch(adminListAllProducts(fData));
  }, [updatePageCnt]);


  const headCells = [
    {
      id: 'p_name',
      numeric: false,
      disablePadding: true,
      label: 'Product Name',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'status',
      numeric: true,
      disablePadding: false,
      label: 'Status',
    },
    {
      id: 'cat_id',
      numeric: true,
      disablePadding: false,
      label: 'Category',
    },
    {
      id: 'created_on',
      numeric: true,
      disablePadding: false,
      label: 'Created At',
    },
  ];

  const tHdata = [
    'p_name', 'price', 'status', 'cat_id', 'created_on'
  ]

  const linkData = [
    '/admin/view-product/',
    '/admin/edit-product/',
    '/admin/delete-product/',
  ]


  useEffect(() => {
    if (pAData?.showToast == 1) {
      setShowT(1);
    } else {
      setShowT(0);
    }
  }, [pAData?.showToast, showT])


  return (
    <AdminTheme>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
        }}
      >
        {
          (showT) ? <CToaster message={'Product Added Successfully !'} open={true} /> : ''
        }

        <Link to="/admin/add-product" color="inherit">
          <Button variant="contained">Add Product</Button>
        </Link>
      </Box>
      {/*pAData?.isLoading ? <Loader /> : */<CTables tHeader={headCells} tData={pAData?.productListData?.data?.rows} tHdata={tHdata} tableTitle={'Products'} linkData={linkData} tCurrentPage={pAData?.productListData?.data?.currentPage} tTotalItems={pAData?.productListData?.data?.totalItems} tTotalPages={pAData?.productListData?.data?.totalPages} updatePageCnt={setUpdatePageCnt} tloading={pAData?.isLoading} />}
    </AdminTheme>
  )
}

export default ListProducts
