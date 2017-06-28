import React from 'react';
import {Link} from 'react-router-dom';

const Pagination = ({
    linkUrlBase = "/",
    sortedBy,
    order,
    hasPreviousPage,
    hasNextPage,
    totalPages,
    previousPage,
    nextPage,
    firstPage
}) =>
{
    return (
        <menu className="module-pagination">
            {totalPages > 1 ? (
                <li className="m-pgn-list-item"><Link to={`${linkUrlBase}?sortedBy=${sortedBy}&order=${order}`}>&lt;&lt; First</Link></li>
            ) : null}

            {hasPreviousPage ? (
                <li className="m-pgn-list-item"><Link to={`${linkUrlBase}?sortedBy=${sortedBy}&order=${order}&page=${previousPage}`}>&lt; Prev</Link></li>
            ) : null}

            {totalPages > 1 ? [...(new Array(totalPages)).keys()].map(i =>
                <li className="m-pgn-list-item" key={i}><Link to={`${linkUrlBase}?sortedBy=${sortedBy}&order=${order}&page=${firstPage + i}`}>{firstPage + i}</Link></li>
            ) : null}

            {hasNextPage ? (
                <li className="m-pgn-list-item"><Link to={`${linkUrlBase}?sortedBy=${sortedBy}&order=${order}&page=${nextPage}`}>Next &gt;</Link></li>
            ) : null}

            {totalPages > 1 ? (
                <li className="m-pgn-list-item"><Link to={`${linkUrlBase}?sortedBy=${sortedBy}&order=${order}&page=${totalPages}`}>Last &gt;&gt;</Link></li>
            ) : null}
        </menu>
    );
};

export default Pagination;