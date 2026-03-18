
const Register = () => {
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl flex justify-center flex-1">

        {/* LEFT SIDE */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">

          <div>
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
              className="w-32 mx-auto"
              alt="Logo"
            />
          </div>

          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold text-gray-100">
              Create Account
            </h1>

            <div className="w-full flex-1 mt-8">

              {/* SOCIAL BUTTONS */}
              <div className="flex flex-col items-center">

                {/* GOOGLE */}
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none">
                  <div className="bg-gray-600 p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path fill="#4285f4" d="M533.5 278.4c0-17.4-1.6-34-4.6-50.2H272v95h146.9c-6.4 34.6-25.8 63.9-55 83.4v69h88.8c52-47.9 80.8-118.5 80.8-197.2z"/>
                      <path fill="#34a853" d="M272 544.3c74.3 0 136.6-24.6 182.1-66.9l-88.8-69c-24.6 16.5-56 26.3-93.3 26.3-71.7 0-132.5-48.4-154.2-113.4H26.7v71.2C71.9 482.4 165.6 544.3 272 544.3z"/>
                      <path fill="#fbbc04" d="M117.8 321.3c-10.6-31.4-10.6-65.3 0-96.7V153.4H26.7c-39.2 78.3-39.2 170.8 0 249.1l91.1-71.2z"/>
                      <path fill="#ea4335" d="M272 107.7c39.8-.6 78.2 14 107.5 40.9l80.1-80.1C408.5 24.6 346.3-.6 272 0 165.6 0 71.9 61.9 26.7 153.4l91.1 71.2C139.5 156.1 200.3 107.7 272 107.7z"/>
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with Google</span>
                </button>

                {/* GITHUB */}
                <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out mt-5">
                  <div className="bg-gray-600 p-1 rounded-full">
                    <svg className="w-6 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.27-1.7-1.27-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.32.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.07 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.6.23 2.78.11 3.07.73.81 1.18 1.83 1.18 3.09 0 4.44-2.69 5.41-5.25 5.7.41.35.78 1.04.78 2.1v3.11c0 .3.21.66.79.55C20.71 21.39 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/>
                    </svg>
                  </div>
                  <span className="ml-4">Sign Up with GitHub</span>
                </button>

              </div>

              {/* DIVIDER */}
              <div className="my-12 border-b border-gray-700 text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-400 tracking-wide font-medium bg-gray-800 transform translate-y-1/2">
                  Or sign up with e-mail
                </div>
              </div>

              {/* FORM */}
              <div className="mx-auto max-w-xs">

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-gray-600 transition"
                  type="text"
                  placeholder="Full Name"
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-gray-600 mt-5 transition"
                  type="email"
                  placeholder="Email"
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-gray-600 mt-5 transition"
                  type="password"
                  placeholder="Password"
                />

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-gray-600 mt-5 transition"
                  type="password"
                  placeholder="Confirm Password"
                />

                <button className="mt-5 tracking-wide font-semibold bg-blue-600 hover:bg-blue-700 text-white w-full py-4 rounded-lg transition-all duration-300 ease-in-out">
                  Create Account
                </button>

                <p className="mt-6 text-xs text-gray-400 text-center">
                  Already have an account?{" "}
                  <a href="#" className="border-b border-gray-500/50 border-dotted hover:text-gray-200 transition">
                    Sign in
                  </a>
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 bg-gradient-to-r from-gray-800 to-blue-900/20 text-center hidden lg:flex border-l border-gray-700">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')"
            }}
          />
        </div>

      </div>
    </div>
)
}

export { Register }