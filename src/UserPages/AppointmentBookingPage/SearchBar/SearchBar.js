import React from 'react';
import { useForm } from 'react-hook-form';

const SearchBar = ({ onFilter }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    // Pass the search data up to the parent component for filtering
    onFilter(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
      <input {...register('nameSurname')} placeholder="Name, surname" />
      <input {...register('startDate')} type="date" />
      <input {...register('endDate')} type="date" />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;