import PropTypes from 'prop-types';
import { coverUrl } from '../lib/api';

export default function BookCard({ book }) {
  const href = `https://openlibrary.org${book.key}`;
  const img = coverUrl(book.coverId, 'M');

  return (
    <article className="book-card">
      <a href={href} target="_blank" rel="noreferrer" className="cover-wrap">
        {img ? (
          <img src={img} alt={`Cover of ${book.title}`} loading="lazy" />
        ) : (
          <div className="cover-fallback" aria-hidden="true">No cover</div>
        )}
      </a>
      <div className="meta">
        <h3 title={book.title}>{book.title}</h3>
        <p className="authors">
          {book.authors.length ? book.authors.join(', ') : 'Unknown author'}
        </p>
        {book.year && <p className="year">First published: {book.year}</p>}
        <a className="details" href={href} target="_blank" rel="noreferrer">View on Open Library →</a>
      </div>
    </article>
  );
}

BookCard.propTypes = {
  book: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number,
    coverId: PropTypes.number,
  }).isRequired,
};