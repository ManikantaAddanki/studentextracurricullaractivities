
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ActivityDetails = () => {

  const { name } = useParams();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    comments: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      "Registration Successful for " +
      name.toUpperCase()
    );

    console.log(formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-5xl mx-auto bg-white shadow-lg">

        <img
          src={`/resources/${name}.jpg`}
          alt={name}
          className="w-full h-80 object-cover"
        />

        <div className="p-8">

          <h1 className="text-5xl font-bold mb-4 capitalize">
            {name} Registration
          </h1>

          <p className="text-gray-600 mb-8">
            Complete the form below to register
            for the {name} activity.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label>Full Name</label>

                <input
                  type="text"
                  name="fullname"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Gender</label>

                <select
                  name="gender"
                  className="w-full border p-3 rounded"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

            </div>

            <div className="mt-6">

              <label>Address</label>

              <textarea
                rows="3"
                name="address"
                className="w-full border p-3 rounded"
                onChange={handleChange}
              />

            </div>

            <div className="mt-6">

              <label>Comments</label>

              <textarea
                rows="4"
                name="comments"
                className="w-full border p-3 rounded"
                onChange={handleChange}
              />

            </div>

            <div className="text-center mt-8">

              <button
                type="submit"
                className="bg-blue-600 text-white px-10 py-3 rounded-lg text-lg hover:bg-blue-800"
              >
                Register Now
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ActivityDetails;
