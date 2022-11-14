import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import { encryptSingleData } from '../../utils/helper';
import { deleteCartItem, createCartItem, createCardPayment } from '../../actions/VariableChangePage';
import { userProfileUpdate } from '../../actions/User';
import { decryptSingleData, decryptUserDataLocalStorage } from '../../utils/helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CartCheckout = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const uData = JSON.parse(decryptUserDataLocalStorage());
  const { currentCItem, success, isCartItemLoading } = useSelector((state) => state.variableChanges);
  const profileData = useSelector((state) => state.userApi);
  const [subTotal, setSubTotal] = useState('0');
  const [taxes, setTaxes] = useState('0');
  const [deliChar, setDeliChar] = useState('0');
  const [totalPrice, setTotalPrice] = useState('0');
  const [userCountry, setUserCountry] = useState(uData?.data?.country);
  const [userState, setUserState] = useState(uData?.data?.state);
  const [userCity, setUserCity] = useState(uData?.data?.city);

  const arr = [1, 2, 3, 4, 5];
  useEffect(() => {
    let sum = 0;
    for (let price of Object.values(currentCItem)) {
      sum += parseFloat(price?.amount);
    }
    setSubTotal(sum)
    setTaxes('8.50')
    setDeliChar('50')
    setTotalPrice(Math.round(parseFloat(sum) + parseFloat(taxes) + parseFloat(deliChar)))
    if (success == "deleted cart item") {
      swal("Removed Cart Item Successfully !", {
        icon: "success"
      });
    } else if (success == "updated") {
      swal("Cart Item Updated Successfully !", {
        icon: "success"
      });
    } else if (profileData?.success == "profile updated") {
      navigate("/payment");
    }
  })


  const updateCartQty = (e) => {
    var details = e?.target?.value?.split('/');
    var cartUpdate = {
      'uid': uData?.data?.id,
      'pid': details[1],
      'quantity': details[0],
    }
    dispatch(createCartItem(cartUpdate))
  }
  const deleteSingleCartItem = (id, pname) => {
    swal({
      title: "Are you sure?",
      text: pname + " will be deleted from your cart and cart items will be updated !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(deleteCartItem(id, uData?.data?.id))
        } else {
          swal("Your cart item is safe!");
        }
      });
  }

  const chkForm = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      address: '',
      location: '',
      country: '',
      state: '',
      city: '',
      pincode: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required('This field is required'),
      last_name: Yup.string().required('This field is required'),
      address: Yup.string().required('This field is required'),
      location: Yup.string().required('This field is required'),
      country: Yup.string().required('This field is required'),
      state: Yup.string().required('This field is required'),
      city: Yup.string().required('This field is required'),
      pincode: Yup.string().required('This field is required'),
      mobile: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = {
        first_name: values.first_name,
        last_name: values.last_name,
        address: values.address,
        location: values.location,
        country: values.country.toString(),
        state: values.state.toString(),
        city: values.city.toString(),
        pincode: values.pincode.toString(),
        mobile: values.mobile,
      };
      dispatch(userProfileUpdate(formData, uData?.data?.id));
    },
  });

  const handleCountryChange = (e) => {
    if (e?.target?.value) {
      chkForm.setFieldValue('country', e?.target?.value)
    }
  }

  const handleStateChange = (e) => {
    if (e?.target?.value) {
      chkForm.setFieldValue('state', e?.target?.value)
    }
  }

  const handleCityChange = (e) => {
    if (e?.target?.value) {
      chkForm.setFieldValue('city', e?.target?.value)
    }
  }

  useEffect(() => {
    chkForm.setValues({
      "first_name": uData?.data?.first_name?.length > 0 ? uData?.data?.first_name : '',
      "last_name": uData?.data?.last_name?.length > 0 ? uData?.data?.last_name : '',
      "address": uData?.data?.address?.length > 0 ? uData?.data?.address : '',
      "location": uData?.data?.location?.length > 0 ? uData?.data?.location : '',
      "country": uData?.data?.country,
      "state": uData?.data?.state,
      "city": uData?.data?.city,
      "pincode": uData?.data?.pincode,
      "mobile": uData?.data?.mobile?.length > 0 ? uData?.data?.mobile : '',
    })
  }, [])


  return (
    <>
      <Header />
      <div className="bg-white">
        <main className="max-w-7xl mx-auto px-4 pt-4 pb-16 sm:px-6 sm:pt-8 sm:pb-24 lg:px-8 xl:px-2 xl:pt-14">
          <h1 className="sr-only">Checkout</h1>
          <div className="max-w-lg mx-auto grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {
              (isCartItemLoading == true) ?
                <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-2 bg-slate-200 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="max-w-lg mx-auto w-full">
                  <h2 className="sr-only">Order summary</h2>
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {
                        currentCItem?.map((cart, key) => {
                          return (
                            <li className="py-6 flex space-x-6" key={key}>
                              <img src={cart?.p_image} alt={cart?.p_name} className="flex-none w-24 h-24 object-center object-cover bg-gray-100 rounded-md" />
                              <div className="flex-auto">
                                <div className="space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6">
                                  <div className="flex-auto text-sm font-medium space-y-1">
                                    <h3 className="text-gray-900">
                                      <Link to={`/product/${encryptSingleData(cart?.pid)}`}>{cart?.p_name}</Link>
                                    </h3>
                                    {/* <p className="text-gray-900">Rs {cart?.amount} /-</p> */}
                                    <p className="hidden text-gray-500 sm:block">&#8377; {cart?.indi_amount} /-</p>
                                    {/* <p className="hidden text-gray-500 sm:block">S</p> */}
                                  </div>
                                  <div className="flex-none flex space-x-4">
                                    <select id="quantity" name="quantity" className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={(e) => updateCartQty(e)}>

                                      {
                                        arr?.map((data, key) => {
                                          return <option value={data + '/' + cart?.pid} key={data} data-pid={cart?.pid} selected={data == cart?.quantity ? 'selected' : false}>{data}</option>
                                        })
                                      }
                                    </select>
                                    <div className="flex border-l border-gray-300 pl-4">
                                      <button type="button" className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-red-400 hover:text-red-500" onClick={(e) => deleteSingleCartItem(cart?.cartid, cart?.p_name)}>
                                        <span className="sr-only">Remove</span>
                                        <svg className="h-5 w-5" x-description="Heroicon name: solid/trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )

                        })
                      }
                    </ul>
                  </div>
                  <dl className="text-sm font-medium text-gray-500 mt-10 space-y-6">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-gray-900">&#8377; {subTotal}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-gray-900">&#8377; {taxes}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Delivery Charges</dt>
                      <dd className="text-gray-900">
                        &#8377; {deliChar}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 text-gray-900 pt-6">
                      <dt className="text-base">Total</dt>
                      <dd className="text-base">&#8377; {totalPrice}</dd>
                    </div>
                  </dl>
                </div>
            }
            <div className="max-w-lg mx-auto w-full">

              <h2 className="text-lg font-medium text-gray-900">Checkout / Delivery Information</h2>
              <form onSubmit={chkForm.handleSubmit}>
                <div className="mt-2 border-t border-gray-200 pt-4">
                  {/* <h2 className="text-lg font-medium text-gray-900"></h2> */}
                  <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First name</label>
                      <div className="mt-1">
                        <input type="text" id="first_name" name="first_name" autoComplete="given-name" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.first_name} onBlur={chkForm.handleBlur} />
                      </div>
                      {chkForm.touched.first_name || chkForm.errors.first_name ? <div className="text-red-600">{chkForm.errors.first_name}</div> : null}
                    </div>
                    <div>
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last name</label>
                      <div className="mt-1">
                        <input type="text" id="last_name" name="last_name" autoComplete="family-name" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.last_name} onBlur={chkForm.handleBlur} />
                      </div>
                      {chkForm.touched.last_name || chkForm.errors.last_name ? <div className="text-red-600">{chkForm.errors.last_name}</div> : null}
                    </div>
                    {/* <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                    <div className="mt-1">
                      <input type="text" name="company" id="company" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} />
                    </div>
                  </div> */}
                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                      <div className="mt-1">
                        <textarea type="text" name="address" id="address" autoComplete="street-address" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.address} onBlur={chkForm.handleBlur}></textarea>
                      </div>
                      {chkForm.touched.address || chkForm.errors.address ? <div className="text-red-600">{chkForm.errors.address}</div> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location, Apartment, suite, Landmark</label>
                      <div className="mt-1">
                        <input type="text" name="location" id="location" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.location} onBlur={chkForm.handleBlur} />
                      </div>
                      {chkForm.touched.location || chkForm.errors.location ? <div className="text-red-600">{chkForm.errors.location}</div> : null}
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">Country</label>
                      <div className="mt-1">
                        <select id="country" name="country" autoComplete="country-name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onBlur={chkForm.handleBlur}
                          onChange={(e) => handleCountryChange(e)} defaultValue={userCountry}>
                          <option value=''>Select Country</option>
                          <option value="1">India</option>
                        </select>
                      </div>
                      {chkForm.touched.country || chkForm.errors.country ? <div className="text-red-600">{chkForm.errors.country}</div> : null}
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">State / Province</label>
                      <div className="mt-1">
                        <select id="state" name="state" autoComplete="state-name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onBlur={chkForm.handleBlur}
                          onChange={(e) => handleStateChange(e)} defaultValue={userState}>
                          <option value=''>Select State</option>
                          <option value="1">Tamil Nadu</option>
                        </select>
                      </div>
                      {chkForm.touched.state || chkForm.errors.state ? <div className="text-red-600">{chkForm.errors.state}</div> : null}
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700">City</label>
                      <div className="mt-1">
                        <select id="city" name="city" autoComplete="city-name" className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onBlur={chkForm.handleBlur}
                          onChange={(e) => handleCityChange(e)} defaultValue={userCity}>
                          <option value=''>Select City</option>
                          <option value="1">Tirupattur</option>
                          <option value="2">Vellore</option>
                          <option value="3">Krishnagiri</option>
                          <option value="4">Tiruvannamalai</option>
                          <option value="5">Villupuram</option>
                        </select>

                      </div>
                      {chkForm.touched.city || chkForm.errors.city ? <div className="text-red-600">{chkForm.errors.city}</div> : null}
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Postal code</label>
                      <div className="mt-1">
                        <input type="text" name="pincode" id="pincode" autoComplete="pincode" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.pincode} onBlur={chkForm.handleBlur} />
                      </div>
                      {chkForm.touched.pincode || chkForm.errors.pincode ? <div className="text-red-600">{chkForm.errors.pincode}</div> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile / mobile</label>
                      <div className="mt-1">
                        <input type="text" name="mobile" id="mobile" autoComplete="tel" className="block w-full border-gray-300 shadow-sm focus:border-indigo-500" style={{ border: '0.5px solid indigo' }} onChange={chkForm.handleChange} value={chkForm.values.mobile} onBlur={chkForm.handleBlur} />
                      </div>
                      {chkForm.touched.mobile || chkForm.errors.mobile ? <div className="text-red-600">{chkForm.errors.mobile}</div> : null}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700"></label>
                      {
                        currentCItem?.length > 0 ?
                          <div className="mt-1">
                            {/* <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Checkout</button> */}
                            <button type="submit" className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                              </svg>

                              <span>Checkout</span>
                            </button>
                          </div> : ''
                      }

                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default CartCheckout