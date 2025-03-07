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
                    <i className="far fa-angle-double-left" />
                </Link>
            </li>
            <li>
                <Link to="#" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
                    <i className="far fa-angle-left" />
                </Link>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={currentPage === page ? "active" : ""}>
                    <Link to="#" onClick={() => handleClick(page)}>{page}</Link>
                </li>
            ))}

            <li>
                <Link to="#" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
                    <i className="far fa-angle-right" />
                </Link>
            </li>
            <li>
                <Link to="#" onClick={() => handleClick(totalPages)} disabled={currentPage === totalPages}>
                    <i className="far fa-angle-double-right" />
                </Link>
            </li>
        </ul>
    );
};

export default Pagination;
