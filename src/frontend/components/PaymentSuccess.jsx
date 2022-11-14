import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import { getPurchasedItemBId } from '../../actions/VariableChangePage';
import { decryptSingleData, decryptUserDataLocalStorage, encryptSingleData } from '../../utils/helper';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const uData = JSON.parse(decryptUserDataLocalStorage());
  const { bookedItems, success, isCartItemLoading } = useSelector((state) => state.variableChanges);
  const ai = useSelector((state) => state.variableChanges);
  console.log(ai);
  const profileData = useSelector((state) => state.userApi);
  const [subTotal, setSubTotal] = useState('0');
  const [taxes, setTaxes] = useState('0');
  const [deliChar, setDeliChar] = useState('0');
  const [totalPrice, setTotalPrice] = useState('0');
  const arr = [1, 2, 3, 4, 5];
  useEffect(() => {
    let sum = 0;
    for (let price of Object.values(bookedItems)) {
      sum += parseFloat(price?.amount);
    }
    setSubTotal(sum)
    setTaxes('8.50')
    setDeliChar('50')
    setTotalPrice(Math.round(parseFloat(sum) + parseFloat(taxes) + parseFloat(deliChar)))
  })

  useEffect(() => {
    dispatch(getPurchasedItemBId(id))
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
                        bookedItems?.map((cart, key) => {
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
                                    <select id="quantity" name="quantity" className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" disabled>

                                      {
                                        arr?.map((data, key) => {
                                          return <option value={data + '/' + cart?.pid} key={data} data-pid={cart?.pid} selected={data == cart?.quantity ? 'selected' : false}>{data}</option>
                                        })
                                      }
                                    </select>
                                    {/* <div className="flex border-l border-gray-300 pl-4">
                                      <button type="button" className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-red-400 hover:text-red-500">
                                        <span className="sr-only">Remove</span>
                                        <svg className="h-5 w-5" x-description="Heroicon name: solid/trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                        </svg>
                                      </button>
                                    </div> */}
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

              <h2 className="text-lg font-medium text-gray-900"></h2>
              <div id="alert-additional-content-3" className="p-4 mb-4 border border-green-300 rounded-lg bg-green-50 dark:bg-green-200" role="alert">
                <div className="flex items-center">
                  <svg aria-hidden="true" className="w-5 h-5 mr-2 text-green-700 dark:text-green-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  <h3 className="text-lg font-medium text-green-700 dark:text-green-800">Payment Success</h3>
                </div>
                <div className="mt-2 mb-4 text-sm text-green-700 dark:text-green-800">
                  Thank you for purchasing products !
                </div>
                <div className="flex">
                  <Link to="/products" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-800 dark:hover:bg-green-900">
                    <svg aria-hidden="true" className="-ml-0.5 mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                    Products
                  </Link>
                  <Link to="/" className="text-green-700 bg-transparent border border-green-700 hover:bg-green-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:border-green-800 dark:text-green-800 dark:hover:text-white" data-dismiss-target="#alert-additional-content-3" aria-label="Close">
                    View Bills
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default PaymentSuccess