import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    return <ReactPaginate
    pageCount={props.pageCount}
    marginPagesDisplayed={1}
    pageRangeDisplayed={5}
    onPageChange={props.handlePageClick}
    containerClassName={'pagination'}
  />
}