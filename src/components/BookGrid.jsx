import PropTypes from 'prop-types';
import BookCard from './BookCard';

export default function BookGrid({ books }) {
  return (
    <section className="grid">
      {books.map(b => <BookCard key={b.key} book={b} />)}
    </section>
  );
}

BookGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};