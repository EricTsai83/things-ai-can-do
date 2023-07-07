function CheckboxDropdown() {
  return (
    <>
      <button
        id="dropdownSearchButton"
        data-dropdown-toggle="dropdownSearch"
        className="
          inline-flex items-center rounded-lg bg-blue-700
          px-4 py-2 text-center text-sm font-medium text-white 
          hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button">
        Dropdown search{' '}
        <svg
          className="ml-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* <div
        id="dropdownSearch"
        className="z-10 hidden w-60 rounded-lg bg-white shadow dark:bg-gray-700"> */}
      <div className="p-3">
        <label htmlFor="input-group-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search user"
          />
        </div>
      </div>
      <ul
        className="h-48 overflow-y-auto px-3 pb-3 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownSearchButton">
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-11"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-11"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Bonnie Green
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              checked
              id="checkbox-item-12"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-12"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Jese Leos
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-13"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-13"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Michael Gough
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-14"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-14"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Robert Wall
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-15"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-15"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Joseph Mcfall
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-16"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-16"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Leslie Livingston
            </label>
          </div>
        </li>
        <li>
          <div className="flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
            <input
              id="checkbox-item-17"
              type="checkbox"
              value=""
              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-700"
            />
            <label
              htmlFor="checkbox-item-17"
              className="ml-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300">
              Roberta Casas
            </label>
          </div>
        </li>
      </ul>
      <a
        href="#"
        className="flex items-center rounded-b-lg border-t border-gray-200 bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline dark:border-gray-600 dark:bg-gray-700 dark:text-red-500 dark:hover:bg-gray-600">
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18">
          <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
        </svg>
        Delete user
      </a>
      {/* </div> */}
    </>
  );
}

export default CheckboxDropdown;
