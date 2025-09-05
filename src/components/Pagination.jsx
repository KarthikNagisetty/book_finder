import PropTypes from 'prop-types';

export default function Pagination({ page, total, pageSize, onPage }) {
  // Open Library returns up to ~100 docs per page; we’ll “display” a smaller pageSize client-side
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <nav className="pagination" aria-label="Pagination">
      <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <span aria-live="polite" className="page-indicator">
        Page {page} of {totalPages}
      </span>
      <button disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </nav>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired,
};