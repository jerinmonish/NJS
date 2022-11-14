import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { UserListAllProducts } from '../../actions/Products'
import { HomePageListCategory } from '../../actions/Category'
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import { Link, useParams } from "react-router-dom";
import { encryptSingleData, decryptSingleData, acendingSorter, decendingSorter } from '../../utils/helper';
// import Pagination from "@mui/lab/Pagination";
import { Pagination } from '@mui/material';
import smp from '../asssets/no-product-found.png';
import CLoader from '../Layouts/CLoader';
import SortingGridIcon from './filters/SortingGridIcon';
import SideBarFilter from './filters/SideBarFilter';
import SideBarFilterMobile from './filters/SideBarFilterMobile';

function AllProducts() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { isLoading, productListData } = useSelector(state => state.productsApi);
  const { categoryData } = useSelector(state => state.categoryApi);
  const { topFilter } = useSelector(state => state.variableChanges);
  const [pageData, SetPageData] = useState([]);
  const [page, setPage] = useState(0);
  const [topBarFilter, setTopBarFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  useEffect(() => {
    let fData = {
      'selected': '?page=0'
    }
    dispatch(UserListAllProducts(fData));
  }, [])

  useEffect(() => {
    dispatch(HomePageListCategory())
  }, [])

  useEffect(() => {
    if (productListData?.data?.currentPage == 0) {
      setPage(1);
    }
  }, [productListData?.data?.currentPage])


  useEffect(() => {
    if (productListData?.data?.rows?.length > 0) {
      if (topBarFilter?.length > 0 || topFilter?.length > 0) {
        if (topBarFilter == "Most Popular" || topFilter == "Most Popular") {
        } else if (topBarFilter == "Best Rating" || topFilter == "Best Rating") {
        } else if (topBarFilter == "Newest" || topFilter == "Newest") {
        } else if (topBarFilter == "Price: Low to High" || topFilter == "Price: Low to High") {
          const sortedData = acendingSorter(productListData?.data?.rows, 'price');
          SetPageData([]);
          SetPageData(sortedData);
        } else if (topBarFilter == "Price: High to Low" || topFilter == "Price: High to Low") {
          const sortedData = decendingSorter(productListData?.data?.rows, 'price');
          SetPageData([]);
          SetPageData(sortedData);
        } else {
          SetPageData(productListData?.data?.rows)
        }
      } else {
        SetPageData(productListData?.data?.rows)
      }
    } else {
      SetPageData([]);
    }
  }, [productListData?.data?.rows, topBarFilter])


  const changePage = (evt, val) => {
    const adJustPage = val - 1;
    let fData = {
      'selected': '?page=' + adJustPage
    }
    dispatch(UserListAllProducts(fData));
    setPage(page + 1)
  }

  // console.log('topBarFilter', topBarFilter)


  return (
    <>
      <Header />
      {
        (isLoading == true) ? <CLoader /> :
          <main className=" ">
            <div className="bg-white">
              <div>
                {/* Mobile filter dialog */}
                {/* Sidebar Mobile Filters Starts */}
                <SideBarFilterMobile category={categoryData} mMobVal={mobileFiltersOpen} updatemMobVal={setMobileFiltersOpen} />
                {/* Sidebar Mobile Filters Starts */}

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative z-10 flex items-baseline justify-between p-5 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">{productListData?.category?.cat_name}</h1>

                    {/* Sorting and Grid Component Starts*/}
                    <SortingGridIcon topSorting={setTopBarFilter} mMenu={setMobileFiltersOpen} />
                    {/* Sorting and Grid Component Ends*/}
                  </div>

                  <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <h2 id="products-heading" className="sr-only">
                      Products
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                      {/* Sidebar Filters Starts */}
                      <SideBarFilter category={categoryData} />
                      {/* Sidebar Filters Ends */}

                      {/* Product grid */}
                      <div className="lg:col-span-3">
                        {/* Replace with your content */}
                        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                          {
                            (pageData?.length > 0) ? pageData?.map((product, index) => {
                              return (
                                <div className="group relative" key={index}>
                                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                    <Link to={'/product/' + encryptSingleData(product?.id)}>
                                      <img src={product?.p_image} alt={product?.p_name} className="w-full h-full object-center object-cover lg:w-full lg:h-full" loading="lazy" />
                                    </Link>
                                  </div>
                                  <div className="mt-4 flex justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <Link to={'/product/' + encryptSingleData(product?.id)}>
                                          <span aria-hidden="true" className="absolute inset-0" />
                                          {product?.p_name}
                                        </Link>
                                      </h3>
                                      <p className="text-sm font-medium text-gray-900">Rs {product?.price} /-</p>
                                    </div>
                                    {/* <p className="text-sm font-medium text-gray-900">Rs {product?.price} /-</p> */}
                                  </div>
                                </div>
                              )
                            }) :
                              <div>
                                <figure>
                                  <img src={smp} alt="Products will arrive soon stay tuned !" />
                                  <figcaption align="center"><b>Products will arrive soon stay tuned !</b></figcaption>
                                </figure>
                              </div>
                          }
                          {/* More products... */}
                        </div>
                        {
                          (productListData?.data?.rows?.length > 0) ?
                            <>
                              <div className='border-b border-gray-200 py-2'></div>
                              <Pagination
                                className='py-4'
                                count={productListData?.data?.totalPages || 1}
                                page={page || 1}
                                // page={productData?.productListData?.data?.currentPage || 1}
                                onChange={changePage}
                                color="primary"
                              /></> : ''
                        }

                        {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" /> */}
                        {/* /End replace */}
                      </div>
                    </div>
                  </section>
                </main>
              </div>
            </div>
          </main>
      }
      <Footer />
    </>
  )
}

export default AllProducts