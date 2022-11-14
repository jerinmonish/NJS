import React, { useEffect, useState, useRef, Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux'
import AdminTheme from "../acomponents/AdminTheme"
import { Autocomplete, Divider, FormControl, FormControlLabel, FormLabel, InputLabel, OutlinedInput } from "@mui/material";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminAddProduct } from '../../actions/Products';
import Loader from "../acomponents/Loader";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { adminDropDownCategory } from '../../actions/Category';

const AddProducts = () => {
  const dispatch = useDispatch()
  const history = useNavigate();
  const pAData = useSelector(state => state?.productsApi);
  const { categoryData } = useSelector(state => state?.categoryApi);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [imgSelected, setImgSelected] = useState([]);

  useEffect(() => {
    formik.setFieldValue("pimage", imgSelected);
    dispatch(adminDropDownCategory());
  }, [imgSelected]);

  useEffect(() => {
    if (categoryData?.data?.length > 0) {
      setCategoryOptions(categoryData?.data)
    }
  }, [categoryData?.data])

  // const categoryOptions = ;
  const formik = useFormik({
    initialValues: {
      p_name: '',
      p_description: '',
      cat_id: '',
      status: '',
      price: '',
      pimage: '',
    },
    validationSchema: Yup.object({
      /*p_name: Yup.string().required('This field is required'),
      p_description: Yup.string().required('This field is required'),
      cat_id: Yup.string().required('This field is required'),
      price: Yup.number().typeError('you must specify a number').min(0, 'Min value 0.').required('This field is required'),
      pimage: Yup.array().min(1, 'This field is required'),*/
    }),
    onSubmit: values => {
      const formData = {
        cat_id: parseInt(values.cat_id),
        p_name: values.p_name,
        p_description: values.p_description,
        price: values.price,
        status: values.status ? values.status : 'Active',
        pimage: values.pimage,
      };
      console.log(formData);
      // dispatch(adminAddProduct(formData, history))
    },
  });

  const handleCategoryChange = (e, val) => {
    if (val?.id) {
      formik.setFieldValue('cat_id', val?.id);
    }
  }

  const handlePhotoChange = (i) => {
    let files = i.target.files;
    var file;
    //loop through files
    for (var i = 0; i < files.length; i++) {
      // get item
      file = files.item(i);
      //or
      file = files[i];
      //alert(file.name);
      let fileReader = new FileReader();
      fileReader.readAsDataURL(files[i]);
      fileReader.onload = (event) => {
        setImgSelected(imgSelected => [...imgSelected, event.target.result]);
      }
    }
  }

  return (
    <AdminTheme>
      {
        pAData?.isLoading ? <Loader /> :
          <>
            <b>Add Product</b>
            <Divider />
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
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
                    <Autocomplete disablePortal id="combo-box-demo" options={categoryOptions} sx={{ width: 200 }} renderInput={(params) => <TextField {...params} label="Product Category" />} name="cat_id" onChange={(e, val) => handleCategoryChange(e, val)} />
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
                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel name="status" value="Active" control={<Radio />} label="Active" />
                      <FormControlLabel name="status" value="Inactive" control={<Radio />} label="Inactive" />
                    </RadioGroup>
                    {formik.touched.status && formik.errors.status ? <FormLabel>{formik.errors.status}</FormLabel> : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" component="label" >Upload File
                    <input type="file" name="pimage" hidden onChange={(e) => handlePhotoChange(e)} multiple />
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <FormControl>
                    <Button variant="contained" type="submit">Save</Button>
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

export default AddProducts