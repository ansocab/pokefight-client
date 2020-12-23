import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    return <ReactPaginate
    pageCount={53}
    marginPagesDisplayed={1}
    pageRangeDisplayed={5}
    onPageChange={props.handlePageClick}
    containerClassName={'pagination'}
  />
}