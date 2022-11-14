import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import AdminTheme from "../acomponents/AdminTheme"
import { Autocomplete, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminUpdateProduct } from '../../actions/Products';
import Loader from "../acomponents/Loader";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { adminDropDownCategory } from '../../actions/Category';
import { adminGetProductById } from "../../actions/Products";
import { decryptSingleData } from "../../utils/helper";

const EditProducts = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const history = useNavigate();
  const pAData = useSelector(state => state?.productsApi);
  const { categoryData } = useSelector(state => state?.categoryApi);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [catValue, setCatValue] = useState('');
  const [staValue, setStaValue] = useState('');

  useEffect(() => {
    dispatch(adminDropDownCategory());
    dispatch(adminGetProductById(decryptSingleData(id)));
  }, []);


  useEffect(() => {
    if (categoryData?.data?.length > 0) {
      setCategoryOptions(categoryData?.data)
    }
  }, [categoryData?.data])

  useEffect(() => {
    if (pAData?.productData != null) {
      formik.setValues({
        "p_name": pAData?.productData?.p_name,
        "p_description": pAData?.productData?.p_description,
        "price": pAData?.productData?.price,
        "cat_id": pAData?.productData?.cat_id,
        "status": pAData?.productData?.status,
      });
      for (let cat of categoryData?.data) {
        if (cat.id == pAData?.productData?.cat_id) {
          setCatValue({ 'id': pAData?.productData?.cat_id, 'label': cat.label });
          // setCatValue(cat.label);
        }
      }
      setStaValue(pAData?.productData?.status);
    }
    // setCatValue(categoryOptions[0])
  }, [pAData?.isLoading, pAData?.productData])

  // const categoryOptions = ;
  const formik = useFormik({
    initialValues: {
      p_name: '',
      p_description: '',
      cat_id: '',
      status: '',
      price: '',
    },
    validationSchema: Yup.object({
      p_name: Yup.string().required('This field is required'),
      p_description: Yup.string().required('This field is required'),
      cat_id: Yup.string().required('This field is required'),
      price: Yup.number().typeError('you must specify a number').min(0, 'Min value 0.').required('This field is required'),
    }),
    onSubmit: values => {
      const formData = JSON.stringify({
        cat_id: parseInt(values.cat_id),
        p_name: values.p_name,
        p_description: values.p_description,
        price: values.price,
        status: values.status ? values.status : 'Active',
      });
      console.log(formData);
      dispatch(adminUpdateProduct(formData, history, decryptSingleData(id)));
    },
  });

  const handleCategoryChange = (e, val) => {
    if (val?.id) {
      formik.setFieldValue('cat_id', val?.id);
      setCatValue({ 'id': val?.id, 'label': val?.label });
    }
  }

  const handleStatus = (e) => {
    if (e.target.value) {
      setStaValue(e.target.value);
    }
  }

  return (
    <AdminTheme>
      {
        pAData?.isLoading ? <Loader /> :
          <>
            <b>Edit Product</b>
            <Divider />
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={1} sx={{
                '& > :not(style)': { m: 2 },
              }}>
                <Grid item xs={2}>
                  <FormControl error={formik.touched.p_name && formik.errors.p_name ? true : false}>
                    <InputLabel>Product Name</InputLabel>
                    <OutlinedInput label="Product Name" name="p_name" onChange={formik.handleChange} value={formik.values.p_name} onBlur={formik.handleBlur}
                    />
                    {formik.touched.p_name && formik.errors.p_name ? <FormLabel>{formik.errors.p_name}</FormLabel > : null}

                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl error={formik.touched.cat_id && formik.errors.cat_id ? true : false}>
                    <Autocomplete disablePortal id="combo-box-demo" options={categoryOptions} value={catValue} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Product Category" />} name="cat_id" onChange={(e, val) => handleCategoryChange(e, val)} />
                    {/* onChange={formik.handleChange} value={formik.values.cat_id} onBlur={formik.handleBlur}  */}
                    {formik.touched.cat_id && formik.errors.cat_id ? <FormLabel>{formik.errors.cat_id}</FormLabel> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl error={formik.touched.price && formik.errors.price ? true : false}>
                    <InputLabel>Product Price</InputLabel>
                    <OutlinedInput label="Product Price" onChange={formik.handleChange} value={formik.values.price} onBlur={formik.handleBlur} name="price"
                    />
                    {formik.touched.price && formik.errors.price ? <FormLabel>{formik.errors.price}</FormLabel> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl error={formik.touched.p_description && formik.errors.p_description ? true : false}>
                    {/* <OutlinedInput
                    label="Product Price"
                  /> */}
                    <TextField id="standard-multiline-static" label="Product Description" multiline rows={4} cols={5} variant="standard" onChange={formik.handleChange} value={formik.values.p_description} onBlur={formik.handleBlur} name="p_description"
                    />
                    {formik.touched.p_description && formik.errors.p_description ? <FormLabel>{formik.errors.p_description}</FormLabel> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={staValue}
                    >
                      <FormControlLabel name="status" value="Active" control={<Radio onClick={(e) => handleStatus(e)} />} label="Active" />
                      <FormControlLabel name="status" value="Inactive" control={<Radio onClick={(e) => handleStatus(e)} />} label="Inactive" />
                    </RadioGroup>
                    {formik.touched.status && formik.errors.status ? <FormLabel>{formik.errors.status}</FormLabel> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <Button variant="contained" type="submit">Update</Button>
                  </FormControl>&nbsp;&nbsp;&nbsp;
                  <FormControl>
                    <Link to="/admin/products">
                      <Button variant="contained" type="reset" color="error">Cancel</Button>
                    </Link>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </>
      }
    </AdminTheme >
  )
}

export default EditProducts