import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, selectUserStatus } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUserInfoAsync } from "../userSlice";

const UserProfile = function () {
  const user = useSelector(selectUserInfo);
  const status = useSelector(selectUserStatus);
  const dispatch = useDispatch();
  const [editAddressIndex, setEditAddressIndex] = useState(-1);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditForm = (address, index) => {
    setShowForm(true);
    setEditAddressIndex(index);
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
    setValue("phone", address.phone);
  };

  const handleAdd = (data) => {
    const newUser = { ...user, addresses: [...user.addresses, data] };
    dispatch(updateUserInfoAsync(newUser));
    reset();
    setShowForm(false);
  };

  const handleEdit = (data) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(editAddressIndex, 1, data);
    dispatch(updateUserInfoAsync(newUser));
    reset();
    setShowForm(false);
    setEditAddressIndex(-1);
  };

  const handleRemove = (index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserInfoAsync(newUser));
  };



  return (
    <>
      {status === "loading"
        ? null
        : user && (
            <>
              {" "}
              <h1 className="text-2xl">My Profile</h1>
              <div className="mx-auto mt-12 pb-8 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h2 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                    Name : {user.name ? user.name : "Guest User"}{" "}
                  </h2>
                  <h2 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                    Email : {user.email ? user.email : "guest@gmail.com"}
                  </h2>
                  <button
                    onClick={() => setShowForm(true)}
                    className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add New Address
                  </button>
                  <div>
                    <p className="pt-2">Saved Address:</p>

                    {showForm && (
                      <form
                        className="bg-white px-5 py-12 mt-12 border border-gray-200"
                        noValidate
                        onSubmit={handleSubmit((data) => {
                          if (editAddressIndex >= 0) handleEdit(data);
                          else handleAdd(data);
                        })}
                      >
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-4">
                            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Full name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("name", {
                                      required: "name is required",
                                    })}
                                    id="name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.name && (
                                    <p className="text-red-500">
                                      {errors.name.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-4">
                                <label
                                  htmlFor="email"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Email address
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="email"
                                    {...register("email", {
                                      required: "email is required",
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.email && (
                                    <p className="text-red-500">
                                      {errors.email.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="phone"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="phone"
                                    {...register("phone", {
                                      required: "phone is required",
                                    })}
                                    type="tel"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.phone && (
                                    <p className="text-red-500">
                                      {errors.phone.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("street", {
                                      required: "street is required",
                                    })}
                                    id="street"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.street && (
                                    <p className="text-red-500">
                                      {errors.street.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("city", {
                                      required: "city is required",
                                    })}
                                    id="city"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.city && (
                                    <p className="text-red-500">
                                      {errors.city.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="state"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State / Province
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("state", {
                                      required: "state is required",
                                    })}
                                    id="state"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.state && (
                                    <p className="text-red-500">
                                      {errors.state.message}
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="pinCode"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    {...register("pinCode", {
                                      required: "pinCode is required",
                                    })}
                                    id="pinCode"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                  {errors.pinCode && (
                                    <p className="text-red-500">
                                      {errors.pinCode.message}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              onClick={(e) => setShowForm(false)}
                              type="button"
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {showForm &&
                                (editAddressIndex >= 0
                                  ? "Edit Address"
                                  : "Add Address")}
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                    {user.addresses.map((address, index) => (
                      <div
                        key={index}
                        className="flex flex-wrap gap-y-2 justify-between my-4 gap-x-6 px-5 py-5 border-sodivd border-2 border-gray-200"
                      >
                        <div className="flex gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {address.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone: {address.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-500">
                            {address.city}
                          </p>
                        </div>
                        <div className="sm:flex sm:flex-col sm:items-end">
                          <button
                            onClick={() => handleEditForm(address, index)}
                            className="blockv text-sm leading-6 text-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleRemove(index)}
                            className="block text-sm leading-6 text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>{" "}
            </>
          )}
    </>
  );
};

export default UserProfile;
