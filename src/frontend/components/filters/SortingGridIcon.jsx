import React, { Fragment, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FilterIcon, ViewGridIcon } from '@heroicons/react/solid'
import { topFilterSorter } from '../../../actions/VariableChangePage';
const SortingGridIcon = (props) => {
  const dispatch = useDispatch();
  const { topFilter } = useSelector(state => state.variableChanges);
  const [sortText, setSortText] = useState(topFilter ? topFilter : 'Sort');

  //To setback the chosen state from redux
  /*useEffect(() => {
    if (topFilter == 'most_popular') {
      setSortText('Most Popular')
    } else if (topFilter == 'best_rating') {
      setSortText('Best Rating')
    } else if (topFilter == 'newest') {
      setSortText('Newest')
    } else if (topFilter == 'low_to_high') {
      setSortText('Price: Low to High')
    } else if (topFilter == 'high_to_low') {
      setSortText('Price: High to Low')
    }
  }, [sortText, topFilter])*/

  const sortOptions = [
    { name: 'Most Popular', current: topFilter && topFilter == 'Most Popular' ? true : false, 'data-test': "most_popular" },
    { name: 'Best Rating', current: topFilter && topFilter == 'Best Rating' ? true : false, 'data-test': "best_rating" },
    { name: 'Newest', current: topFilter && topFilter == 'Newest' ? true : false, 'data-test': "newest" },
    { name: 'Price: Low to High', current: topFilter && topFilter == 'Price: Low to High' ? true : false, 'data-test': "low_to_high" },
    { name: 'Price: High to Low', current: topFilter && topFilter == 'Price: High to Low' ? true : false, 'data-test': "high_to_low" },
  ]
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const handleTopSort = (e) => {
    if (e.target.text) {
      //props?.topSorting?.push({ 'topSort': e.target.text })
      setSortText(e.target.text);
      props?.topSorting(e.target.text);
      dispatch(topFilterSorter(e.target.text));
    }
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
            {sortText}
            <ChevronDownIcon
              className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <a
                      href={option.href}
                      className={classNames(
                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm'
                      )}
                      onClick={(e) => handleTopSort(e)}
                    >
                      {option.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      {/* <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
        <span className="sr-only">View grid</span>
        <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
      </button> */}
      <button
        type="button"
        className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
        onClick={() => props?.mMenu(true)}
      >
        <span className="sr-only">Filters</span>
        <FilterIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  )
}

export default SortingGridIcon