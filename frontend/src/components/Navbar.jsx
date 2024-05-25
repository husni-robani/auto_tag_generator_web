import React from "react";
import { useMatch, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const navigationClass = (path) => {
    return (
      "block py-2 px-3 md:p-0 text-black bg-white rounded " +
      (useMatch(path) ? "md:text-black0" : "md:text-slate-400")
    );
  };

  const handleNavigation = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };
  return (
    <>
      <nav class="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-center mx-auto p-4">
          <div class="w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a
                  onClick={handleNavigation("/")}
                  href="/"
                  class={navigationClass("/")}
                  aria-current="page"
                >
                  Journal List
                </a>
              </li>
              <li>
                <a
                  onClick={handleNavigation("/input-journal")}
                  href="/input-journal"
                  class={navigationClass("/input-journal")}
                  aria-current="page"
                >
                  Input Journal
                </a>
              </li>
              <li>
                <a
                  onClick={handleNavigation("/predict")}
                  href="/predict"
                  class={navigationClass("/predict")}
                  aria-current="page"
                >
                  Predict
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
