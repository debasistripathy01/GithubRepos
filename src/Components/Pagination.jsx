import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, onPageChange, pageCount }) {
  const pageNumbers = [];

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="container">
      {pageNumbers.map(pageNumber => (
        <li
          key={pageNumber}
          className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
        >
          <button className="page-link" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </button>
        </li>
      ))}
    </ul>
  );
}

export  {Pagination};
