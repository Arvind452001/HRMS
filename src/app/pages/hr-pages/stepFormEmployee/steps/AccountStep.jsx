import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function accountStep() {
  const { register } = useFormContext();

  const [showLoginPassword, setShowLoginPassword] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Row 1 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Official Email</span>
          </label>
          <input
            type="email"
            {...register("account.officialEmail")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Official Password</span>
          </label>
          <input
            type="password"
            {...register("account.officialPassword")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Row 2 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Skype ID</span>
          </label>
          <input
            type="text"
            {...register("account.skypeId")}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Skype Password</span>
          </label>
          <input
            type="password"
            {...register("account.skypePassword")}
            className="input input-bordered w-full"
          />
        </div>

        {/* Row 3 */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Personal Email</span>
          </label>
          <input
            type="email"
            {...register("account.personalEmail")}
            className="input input-bordered w-full"
          />
        </div>

        {/* ✅ LOGIN PASSWORD */}
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Login Password</span>
          </label>

          <input
            type={showLoginPassword ? "text" : "password"}
            {...register("account.loginPassword")}
            className="input input-bordered w-full"
            placeholder="Enter login password"
          />

          <button
            type="button"
            className="absolute right-3 top-[42px]"
            onClick={() => setShowLoginPassword(!showLoginPassword)}
          >
            👁
          </button>
        </div>

      </div>
    </div>
  );
}