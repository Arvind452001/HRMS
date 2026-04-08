import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function DocumentsStep() {
  const { register } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Documents</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* AADHAR */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">Aadhar Card</span>
            <span className="text-xs text-gray-500">:- Image or PDF</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            {...register('documents.aadharCard')}
            name="documents[aadharCard]"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* PAN */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">PAN Card</span>
            <span className="text-xs text-gray-500">:- Image or PDF</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            {...register('documents.panCard')}
            name="documents[panCard]"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* RESUME */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">Resume</span>
            <span className="text-xs text-gray-500">:- PDF only</span>
          </label>
          <input
            type="file"
            accept=".pdf"
            {...register('documents.resume')}
            name="documents[resume]"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* EDUCATION */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">Education Certificates</span>
            <span className="text-xs text-gray-500">:- Image or PDF</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            {...register('documents.education')}
            name="documents[education]"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* EXPERIENCE */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">Experience Letters</span>
            <span className="text-xs text-gray-500">:- Image or PDF</span>
          </label>
          <input
            type="file"
            accept="image/*,.pdf"
            {...register('documents.experience')}
            name="documents[experience]"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* OFFER LETTER */}
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text font-medium">Offer Letter</span>
            <span className="text-xs text-gray-500">:- PDF only</span>
          </label>
          <input
            type="file"
            accept=".pdf"
            {...register('documents.offerLetter')}
            name="documents[offerLetter]"
            className="file-input file-input-bordered w-full"
          />
        </div>

      </div>
    </div>
  );
}