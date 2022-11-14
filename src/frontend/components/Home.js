import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { HomePageListCategory } from '../../actions/Category'
import { Link } from "react-router-dom";
import { encryptSingleData } from '../../utils/helper';
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
function Home() {
  const dispatch = useDispatch();
  const catData = useSelector(state => state.categoryApi);
  const [catItems, setCatItems] = useState([]);

  useEffect(() => {
    dispatch(HomePageListCategory())
  }, [])

  return (
    <>
      <Header />
      <main className="flex-1 overflow-y-auto p-5">
        <div className="py-20" style={{ 'background': 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' }}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-2 text-white">
              DBC Commerce
            </h2>
            <h3 className="text-2xl mb-8 text-gray-200">
              Innovate and Lead
            </h3>
            {/* <button className="bg-white font-bold rounded-full py-4 px-8 shadow-lg uppercase tracking-wider">
            Pre Order
          </button> */}
          </div>
        </div>
        <div className="bg-white">
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 text-center">Our Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {catData?.categoryData?.data?.map((catitems, idx) => {
                return (
                  <div key={idx} className="group relative">
                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                      <Link to={'/products/' + encryptSingleData(catitems?.id)} title={catitems?.cat_name}><img
                        src={catitems?.cat_image}
                        alt={catitems?.cat_name}
                        className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                      /></Link>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={'/products/' + encryptSingleData(catitems?.id)} title={catitems?.cat_name}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {catitems?.cat_name}
                          </Link>
                        </h3>
                        {/* <p className="mt-1 text-sm text-gray-500">{catitems?.cat_name}</p> */}
                      </div>
                      {/* <p className="text-sm font-medium text-gray-900">12</p> */}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <section className="bg-gray-100">
          <div className="container mx-auto px-6 py-20">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Reviews
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">Very Good Food.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">John Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">Chappthi and Curry are Delicious, especially that Channa.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">Jane Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="bg-white rounded shadow py-2">
                  <p className="text-gray-800 text-base px-6 mb-5">I don't regret buying this wearble gadget. One of the best gadgets I own!.</p>
                  <p className="text-gray-500 text-xs md:text-sm px-6">James Doe</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={{ 'backgroundImage': `url("https://cdn.pixabay.com/photo/2014/08/14/14/21/shish-kebab-417994_960_720.jpg")`, 'backgroundSize': 'cover', 'overflow': 'hidden' }}>
          <div className="container mx-auto px-6 text-center py-20">
            <h2 className="mb-6 text-4xl font-bold text-center text-white">
              Limited in Stock
            </h2>
            <h3 className="my-4 text-2xl text-white">
              Get yourself the Order Now
            </h3>
            <button className="bg-white font-bold rounded-full mt-6 py-4 px-8 shadow-lg uppercase tracking-wider">
              Pre Order
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home