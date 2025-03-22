import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) return null; // Ocultar si solo hay una página

    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <ul className="pagination">
            <li>
                <Link to="#" onClick={() => handleClick(1)} disabled={currentPage === 1}>
                    <i className="fas fa-angle-double-left"></i>
                </Link>
            </li>
            <li>
                <Link to="#" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                    <i className="fas fa-angle-left"></i>
                </Link>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={currentPage === page ? "active" : ""}>
                    <Link to="#" onClick={() => handleClick(page)}>{page}</Link>
                </li>
            ))}

            <li>
                <Link to="#" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                    <i className="fas fa-angle-right"></i>
                </Link>
            </li>
            <li>
                <Link to="#" onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                    <i className="fas fa-angle-double-right"></i>
                </Link>
            </li>
        </ul>
    );
};

export default Pagination;
