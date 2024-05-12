import React from 'react';
import { useForm } from 'react-hook-form';

// Assuming specialities and users are passed as props and may include more detailed objects in your real use case
const SearchBar = ({ onFilter, specialities, users }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log("Form Submission Data: ", data);
    onFilter(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
      <div className="select-container">
        <label htmlFor="speciality">Medical Specialty</label>
        <select id="speciality" {...register('speciality')}>
          <option value="">Select a Specialty</option>
          {specialities.map((speciality, index) => (
            <option key={index} value={speciality.id}>
              {speciality.name}
            </option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="user">User</label>
        <select id="user" {...register('user')}>
          <option value="">Select a User</option>
          {users.map((user, index) => (
            <option key={index} value={user.id}>
              { user.firstName + " " + user.lastName}
            </option>
          ))}
        </select>
      </div>
      <input {...register('from')} type="datetime-local" />
      <input {...register('to')} type="datetime-local" />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
