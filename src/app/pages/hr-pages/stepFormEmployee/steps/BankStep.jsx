import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function BankStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Bank Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ✅ Account Holder Name */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Account Holder Name</span>
          </label>
          <input
            type="text"
            {...register('bank.accountHolderName')}
            className="input input-bordered w-full"
            placeholder="Enter account holder name"
          />
        </div>

        {/* Bank Name */}
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Bank Name</span>
          </label>
          <input
            type="text"
            {...register('bank.bankName')}
            className="input input-bordered w-full"
          />
        </div>

        {/* Account Number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Account Number</span>
          </label>
          <input
            type="text"
            {...register('bank.accountNumber')}
            className="input input-bordered w-full"
          />
        </div>

        {/* IFSC Code */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">IFSC Code</span>
          </label>
          <input
            type="text"
            {...register('bank.ifscCode')}
            className="input input-bordered w-full"
          />
        </div>

        {/* Branch */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Branch</span>
          </label>
          <input
            type="text"
            {...register('bank.branch')}
            className="input input-bordered w-full"
          />
        </div>

      </div>
    </div>
  );
}