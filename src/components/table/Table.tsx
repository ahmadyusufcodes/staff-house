import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]

interface TableProps {
  data: {
    [key: string]: any;
  }[];
  columns: {
    label: string;
    key: string;
  }[];
  actions?: {
    label?: string;
    icon: React.ReactNode;
    onClick: (data: any) => void;
  }[];
  filterComponent?: React.ReactNode;
  pagination?: {
    total: number;
    limit: number;
    page: number;
    onChange: (page: number) => void;
  };
  onClickItem?: (data: any) => void;
}

const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { scale: .2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1
    }
  };

export default function Table({
    data,
    columns,
    actions,
    filterComponent,
    pagination,
    onClickItem
}: TableProps) {
  return (
    <div 
        className="flex flex-col w-full">
        {filterComponent}
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        {columns.map((column, index) => (
                            <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                {column.label}
                            </th>
                        ))}
                        {actions && (
                            <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                            {columns.map((column, index) => (
                                <td 
                                onClick={() => onClickItem && onClickItem(item)}
                                key={index} 
                                className="cursor-pointer px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item[column.key]}</div>
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end">
                                        {actions.map((action, index) => (
                                            <button
                                            key={index}
                                            onClick={() => action.onClick(item)}
                                            className="flex gap-2 text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                {action.icon}
                                                <span>{action.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </td>
                            )}
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>


    <div className="flex items-center justify-between rounded-lg shadow border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <span
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </span>
        <span
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </span>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">
              {
                pagination && pagination.page * pagination.limit - pagination.limit + 1
              }
              </span> to <span className="font-medium">
                {
                  pagination && pagination.page * pagination.limit > pagination.total ? pagination.total : pagination && pagination.page * pagination.limit
                }
                </span> of{' '}
            <span className="font-medium">{
              pagination && pagination.total
            }</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <span
              className={`${
                pagination && pagination.page === 1 ? "pointer-events-none ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 bg-gray-100 text-gray-400" : "text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              } relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {
              pagination && Array.from(Array(pagination.total).keys()).map((page, index) => (
                <span
                key={index}
                onClick={() => pagination.onChange(page + 1)}
                className={`${page > (pagination.total / pagination.limit) ? "ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 bg-gray-100 text-gray-400 pointer-events-none" : "text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"} relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              >
                {page + 1}
              </span>
              ))
            }
            {
              pagination && pagination.total > 10 &&
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>}
            {
              pagination && pagination.total > 10 &&
              <span
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              {pagination.total}
            </span>
            }
            <span
              onClick={() => pagination && pagination.onChange(pagination.page + 1)}
              className={`${
                pagination && pagination.page * pagination.limit > pagination.total ? "pointer-events-none ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 bg-gray-100 text-gray-400" : "text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              } relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </span>
          </nav>
        </div>
      </div>
    </div>

    </div> 
  )
}
