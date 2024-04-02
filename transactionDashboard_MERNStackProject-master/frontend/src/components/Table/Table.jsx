import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";

export default function Table({setMonth, currentMonth}) {
  const month = [
    { id: 1, name: "january" },
    { id: 2, name: "february" },
    { id: 3, name: "march" },
    { id: 4, name: "april" },
    { id: 5, name: "may" },
    { id: 6, name: "june" },
    { id: 7, name: "july" },
    { id: 8, name: "august" },
    { id: 9, name: "september" },
    { id: 10, name: "october" },
    { id: 11, name: "november" },
    { id: 12, name: "december" },
  ];

  const [customerDetailes, setCustomerDetailes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [monthData, setMonthData] = useState(month); 


  const getAllUser = async () => {
    const response = await fetch(`https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/monthly/${currentMonth}`);

    const  data = await response.json();

    console.log(data);
    // setTotalPage(totalPage);
    setCustomerDetailes(data);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const handlePrevious = async () => {
    if (page > 1) {
      const response = await fetch(
        `https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/${page-1}`
      );

      const { data } = await response.json();

      console.log(data);
      setPage(page - 1);

      setCustomerDetailes(data);
    }
  };

  function setMonthlyData({data, currMonth}) {
    setCustomerDetailes(data);  
    setMonth(currMonth) ;

  }

  const handleNext = async () => {
    if (page < totalPage) {
      const response = await fetch(
        `https://transaction-dashboard-mern-stack-project-backend.vercel.app/allTransaction/${page +1}`
      );

      const { data } = await response.json();

      console.log(data);
      setPage(page + 1);
      setCustomerDetailes(data);
    }
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <input
              type="search"
              className="border-gray-200 border w-[250px] rounded-full py-3 px-4"
              placeholder="search transaction"
            />
          </div>

          <div>
            <Dropdown month={monthData} setData={setMonthlyData} />
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="-my-2 overflow-x-auto -mx-8  ">
            <div className="inline-block min-w-full py-2 align-middle px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Id
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Category
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Sold
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        image
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {customerDetailes.map((customer) => (
                      <tr
                        key={customer.id}
                        className="divide-x divide-gray-200"
                      >
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-6 flex-shrink-0">
                              {customer.id}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-wrap px-12 py-4">
                          <div className="text-sm text-gray-900">
                            {customer.title}
                          </div>
                        </td>

                        <td className="whitespace-wrap px-4 py-4">
                          <div className="inline-flex rounded-full px-2 text-xs font-semibold leading-5">
                            {customer.description}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {customer.price}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {customer.category}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          {Number(customer.sold)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={customer.image}
                            alt=""
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full border-black">
          <div className="mt-2 flex items-center gap-[450px]">
            <div>
              <p>page No : {page} </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={handlePrevious}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                onClick={handleNext}
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
            <div>Per Page : 10</div>
          </div>
        </div>
      </section>
    </>
  );
}
