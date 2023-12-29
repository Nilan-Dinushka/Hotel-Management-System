
interface RoomPaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

export function RoomPaginator({currentPage, totalPages, onPageChange}:RoomPaginatorProps) {

    const pageNumbers = Array.from({length : totalPages},(_,i) => i+1)
    return (
        <nav aria-label={"Page navigation"}>
            <ul className={"pagination justify-content-center"}>
                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? "active" : ""}`}>
                        <button className={"page-link"} onClick={() => onPageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}