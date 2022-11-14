import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import { createCardPayment } from '../../actions/VariableChangePage';
import { decryptUserDataLocalStorage, encryptSingleData } from '../../utils/helper';
const CardPayment = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const uData = JSON.parse(decryptUserDataLocalStorage());
  const { currentCItem, success, isCartItemLoading } = useSelector((state) => state.variableChanges);
  const [subTotal, setSubTotal] = useState('0');
  const [taxes, setTaxes] = useState('0');
  const [deliChar, setDeliChar] = useState('0');
  const [totalPrice, setTotalPrice] = useState('0');
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cfullName, setCFullName] = useState(uData?.data?.first_name + ' ' + uData?.data?.last_name);
  const [address, setAddress] = useState('');
  const [phNo, setPhNo] = useState('');
  const [updateclass1, setUpdateClass1] = useState('');
  const [updateclass2, setUpdateClass2] = useState('');
  const [updateclass3, setUpdateClass3] = useState('');
  const [updatePaymentLoading, setUpdatePaymentLoading] = useState(false);
  const [expirationVal, setExpirationVal] = useState('');
  const [enableDisable, setEnableDisable] = useState(false)

  useEffect(() => {
    let sum = 0;
    for (let price of Object.values(currentCItem)) {
      sum += parseFloat(price?.amount);
    }
    setSubTotal(sum)
    setTaxes('8.50')
    setDeliChar('50')
    setTotalPrice(Math.round(parseFloat(sum) + parseFloat(taxes) + parseFloat(deliChar)))
    setFullName(uData?.data?.first_name + ' ' + uData?.data?.last_name)
    setAddress(uData?.data?.address + ', ' + uData?.data?.city + ', ' + uData?.data?.state + ', ' + uData?.data?.country + ' - ' + uData?.data?.pincode + ' ( ' + uData?.data?.location + ' )')
    setPhNo(uData?.data?.mobile)
  })

  const handleExpiration = (e) => {
    var setFtxt = '';
    if (e?.target?.value) {
      if (e.target.value.length === 3 && !e.target.value.includes("/")) {
        setFtxt = e.target.value.substring(0, 2) + '/' + e.target.value.substring(2)
      } else {
        setFtxt = e.target.value
      }
    }
    setExpirationVal(setFtxt)
    handlePaymentForm.setFieldValue('expiration', setFtxt)
  }

  const handleNameOnCard = (e) => {
    handlePaymentForm.setFieldValue('name_on_card', e?.target?.value)
    setCFullName(e?.target?.value)
  }

  const handleCardNumber = (e) => {
    handlePaymentForm.setFieldValue('name_on_card', cfullName)
    setCardNumber(e.target.value);
    handlePaymentForm.setFieldValue('card_number', e.target.value)
  }

  const handlePaymentForm = useFormik({
    initialValues: {
      name_on_card: '',
      card_number: '',
      expiration: '',
      cvc: '',
    },
    validationSchema: Yup.object({
      name_on_card: Yup.string().required('This field is required'),
      card_number: Yup.string().required('This field is required'),
      expiration: Yup.string().required('This field is required'),
      cvc: Yup.string().required('This field is required'),
    }),
    onSubmit: values => {
      const formData = {
        name_on_card: cfullName,
        card_number: values.card_number,
        expiration: values.expiration,
        cvc: values.cvc,
        uid: uData?.data?.id,
        total_temp_price: totalPrice,
      };
      setUpdateClass1('blinkText')
      setUpdateClass2('blinkText2')
      setUpdateClass3('updateBorader')
      setUpdatePaymentLoading(true)
      setEnableDisable(true);
      dispatch(createCardPayment(formData, history));
    },
  });
  return (
    <>
      <Header />
      {/* {JSON.stringify(handlePaymentForm?.errors)} */}
      <div className="h-screen grid grid-cols-3 px-5 py-5">
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
          <form id="payment-form" onSubmit={handlePaymentForm.handleSubmit}>
            <div className={"mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md " + updateclass3}>
              <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                <div className="text-yellow-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className={"text-sm font-medium ml-3 " + updateclass1}>
                  {
                    (updateclass1 == 'blinkText') ? 'Payment in Process: ' : 'Final Checkout'
                  }
                </div>
              </div>
              <div className={"text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4 " + updateclass2}>
                {
                  (updateclass1 == 'blinkText') ? 'Payment has started, Please dont refresh the tab or close the browser.' : 'Complete your shipping and payment details below.'
                }
              </div>
              <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
            </div>
            <div className="rounded-md">

              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Payment Information</h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2 text-pink-600">Name On Card</span>
                    <input type="text" name="name_on_card" className="focus:outline-none px-3" placeholder={handlePaymentForm.touched.name_on_card || handlePaymentForm.errors.name_on_card ? handlePaymentForm.errors.name_on_card : "John Doe"} onChange={(e) => handleNameOnCard(e)} value={cfullName} onBlur={handlePaymentForm.handleBlur} />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2 text-pink-600">Card Number</span>
                    <input name="card_number" type="text" className="focus:outline-none px-3" placeholder={handlePaymentForm.touched.card_number || handlePaymentForm.errors.card_number ? handlePaymentForm.errors.card_number : "1234 1234 1234 1234"} onChange={(e) => handleCardNumber(e)} value={cardNumber} onBlur={handlePaymentForm.handleBlur} />
                  </label>
                  <label className="inline-flex w-2/4 border-gray-200 py-3">
                    <span className="text-right px-2 text-pink-600">Expiration</span>
                    <input type="text" name="expiration" className="focus:outline-none px-3" placeholder={handlePaymentForm.touched.expiration || handlePaymentForm.errors.expiration ? handlePaymentForm.errors.expiration : "MM/YY"} onChange={(e) => handleExpiration(e)} value={expirationVal} onBlur={handlePaymentForm.handleBlur} maxLength={5} />
                  </label>
                  <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                    <span className="text-right px-2 xl:px-0 xl:text-none text-pink-600">CVC</span>
                    <input type="text" name="cvc" className="focus:outline-none px-3" placeholder={handlePaymentForm.touched.cvc || handlePaymentForm.errors.cvc ? handlePaymentForm.errors.cvc : "CVC"} onChange={handlePaymentForm.handleChange} value={handlePaymentForm.values.cvc} onBlur={handlePaymentForm.handleBlur} maxLength={4} />
                  </label>
                </fieldset>
              </section>

            </div>
            <div className="rounded-md">
              <section>
                <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Confirmed Delivery Information</h2>
                <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2 text-pink-600">Full Name</span>
                    <input name="card" className="focus:outline-none px-3 w-full" value={fullName} readOnly />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2 text-pink-600">Phone No</span>
                    <input name="card" className="focus:outline-none px-3 w-full" value={phNo} readOnly />
                  </label>
                  <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                    <span className="text-right px-2 text-pink-600">Address</span>
                    <input name="card" className="focus:outline-none px-3 w-full" value={address} readOnly />
                  </label>
                </fieldset>
              </section>
            </div>
            {
              currentCItem?.length > 0 ? <button type="submit" className="submit-button px-4 py-3 rounded-full bg-blue-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors" disabled={enableDisable}>
                {(() => {
                  if (updatePaymentLoading == true) {
                    return (
                      <>
                        <svg role="status" className="inline mr-3 w-6 h-6 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Payment in Progress, Please Wait...
                      </>
                    )
                  } else {
                    return (
                      <>
                        Pay &#8377; {totalPrice}
                      </>
                    )
                  }
                })()}
              </button> : ''
            }
          </form>
        </div>
        <div className="col-span-1 bg-white lg:block hidden">
          <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
          <ul className="py-6 border-b space-y-6 px-8">

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
                </div>
                :
                currentCItem?.map((cart, key) => {
                  return (
                    <li className="grid grid-cols-6 gap-2 border-b-1" key={key}>
                      <div className="col-span-1 self-center">
                        <img src={cart?.p_image} alt={cart?.p_name} className="rounded w-full" />
                      </div>
                      <div className="flex flex-col col-span-3 pt-2">
                        <span className="text-gray-600 text-md font-semi-bold"><Link to={`/product/${encryptSingleData(cart?.pid)}`}>{cart?.p_name}</Link></span>
                        {/* <span className="text-gray-400 text-sm inline-block pt-2">Red Headphone</span> */}
                      </div>
                      <div className="col-span-2 pt-3">
                        <div className="flex items-center space-x-2 text-sm justify-between">
                          <span className="text-gray-400">{cart?.quantity} x &#8377; {cart?.indi_amount}</span>
                          <span className="text-pink-400 font-semibold inline-block">&#8377; {cart?.amount}</span>
                        </div>
                      </div>
                    </li>
                  )

                })
            }
          </ul>
          <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
              <span>Subtotal</span>
              <span className="font-semibold text-pink-500">&#8377; {subTotal}</span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Taxes</span>
              <span className="font-semibold text-pink-500">{taxes}</span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
              <span>Delivery Charges</span>
              <span className="font-semibold text-pink-500">{deliChar}</span>
            </div>
          </div>
          <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
            <span>Total</span>
            <span>&#8377; {totalPrice}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CardPayment