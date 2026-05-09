// import React, { useState } from "react";
// import Swal from "sweetalert2";

// export default function Support() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     category: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // 👉 basic validation
//     if (!form.name || !form.email || !form.message) {
//       return Swal.fire("Error", "Please fill all fields", "error");
//     }

//     console.log("Support Request:", form);

//     // 👉 API call yaha lagana hai
//     // await sendSupportApi(form)

//     Swal.fire("Success", "Your request has been submitted!", "success");

//     setForm({
//       name: "",
//       email: "",
//       category: "",
//       message: "",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

//       <div className="max-w-full mx-auto bg-white shadow-2xl rounded-2xl p-6 grid md:grid-cols-2 gap-6">

//         {/* LEFT INFO */}
//         <div className="space-y-4">
//           <h2 className="text-2xl font-bold text-indigo-600">
//             Contact Support
//           </h2>

//           <p className="text-gray-600">
//             Facing any issue in HRMS? Our support team is here to help you.
//           </p>

//           <div className="bg-indigo-50 p-4 rounded-xl">
//             <p className="font-semibold">📧 Email</p>
//             <p className="text-sm text-gray-600">support@company.com</p>
//           </div>

//           <div className="bg-indigo-50 p-4 rounded-xl">
//             <p className="font-semibold">📞 Phone</p>
//             <p className="text-sm text-gray-600">+91 9876543210</p>
//           </div>

//           <div className="bg-indigo-50 p-4 rounded-xl">
//             <p className="font-semibold">⏰ Working Hours</p>
//             <p className="text-sm text-gray-600">Mon - Fri (10:00 AM - 07:30 PM)</p>
//           </div>
//         </div>

//         {/* RIGHT FORM */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           <input
//             type="text"
//             name="name"
//             placeholder="Your Name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={form.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           >
//             <option value="">Select Issue Type</option>
//             <option value="HR">HR Issue</option>
//             <option value="Payroll">Payroll Issue</option>
//             <option value="Technical">Technical Issue</option>
//           </select>

//           <textarea
//             name="message"
//             rows="4"
//             placeholder="Describe your issue..."
//             value={form.message}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
//           />

//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 rounded-lg font-semibold hover:opacity-90"
//           >
//             Submit Request
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function Support() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-red-200 px-4">
      {/* CARD */}
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 lg:p-10">
        <h2 className="mb-4 text-3xl lg:text-4xl font-extrabold text-center text-gray-900">
          Contact Us
        </h2>

        <p className="mb-8 text-center text-gray-600">
          Got a technical issue? Need help with HRMS? Let us know.
        </p>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Your email
            </label>

            <input
              type="email"
              placeholder="name@company.com"
              required
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 
          focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Subject
            </label>

            <input
              type="text"
              placeholder="How can we help you?"
              required
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 
          focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-800">
              Your message
            </label>

            <textarea
              rows="5"
              placeholder="Describe your issue..."
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 
          focus:ring-2 focus:ring-blue-400 outline-none transition"
            ></textarea>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-lg 
        bg-gradient-to-r from-blue-600 to-red-500 hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
