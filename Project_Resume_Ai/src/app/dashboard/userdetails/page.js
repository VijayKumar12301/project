'use client';
import { useState } from 'react';
import axios from 'axios';
import generateResume from './generateResume';
const InputField = ({ label, name, type = 'text', as = 'input', value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-bold text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
const ResumeForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    presentAddress: '',
    profile: '',
    branch: '',
    college: '',
    percentage: '',
    passingYear: '',
    skills: '',
    technicalCertifications: '',
    internshipCertifications: '',
    yearsOfExperience: '',
    experienceDetails: '',
    linkedinProfile: '',
    project: '',
    hobbies: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/ai/generateresume', formData);
      // console.log(response.data.data)
      generateResume(response.data.data);
      // console.log('Corrected Resume:', response.data.data);
    } catch (error) {
      console.error('Error submitting resume:', error);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center py-8" style={{ backgroundColor: '#71BBB2' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
          <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
          <InputField label="Date of Birth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} />
          <InputField label="Gender" name="gender" value={formData.gender} onChange={handleChange} />
          <InputField label="Address" name="presentAddress" value={formData.presentAddress} onChange={handleChange} />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Education & Experience</h2>
          <InputField label="College Name" name="college" value={formData.college} onChange={handleChange} />
          <InputField label="Branch" name="branch" value={formData.branch} onChange={handleChange} />
          <InputField label="Percentage" name="percentage" type="number" value={formData.percentage} onChange={handleChange} />
          <InputField label="Year of Passing" name="passingYear" type="number" value={formData.passingYear} onChange={handleChange} />
          <InputField label="Years of Experience" name="yearsOfExperience" type="number" value={formData.yearsOfExperience} onChange={handleChange} />
          <InputField label="Experience Details" name="experienceDetails" as="textarea" rows="2" value={formData.experienceDetails} onChange={handleChange} />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Details</h2>
          <InputField label="Skills" name="skills" value={formData.skills} onChange={handleChange} />
          <InputField label="Internship Certifications" name="internshipCertifications" as="textarea" rows="2" value={formData.internshipCertifications} onChange={handleChange} />
          <InputField label="Technical Certifications" name="technicalCertifications" as="textarea" rows="2" value={formData.technicalCertifications} onChange={handleChange} />
          <InputField label="LinkedIn Profile" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} />
          <InputField label="Project" name="project" as="textarea" rows="2" value={formData.project} onChange={handleChange} />
          <InputField label="Hobbies" name="hobbies" value={formData.hobbies} onChange={handleChange} />
          <div className="text-center mt-4">
            <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResumeForm;