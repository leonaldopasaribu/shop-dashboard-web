import { Button } from "../button";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

export const Pagination = ({
  currentPage,
  totalPage,
  handlePreviousPage,
  handleNextPage,
}: PaginationProps) => {
  function onClickButtonPrevious(): void {
    handlePreviousPage();
  }

  function onClickButtonNext(): void {
    handleNextPage();
  }

  const isButtonPreviousDisabled: boolean =
    currentPage === 1 || isNaN(currentPage);
  const isButtonNextDisabled: boolean =
    currentPage === totalPage || isNaN(currentPage);

  return (
    <div className="flex justify-end">
      <Button
        onClick={onClickButtonPrevious}
        className="flex items-center justify-center px-3 h-8 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={isButtonPreviousDisabled}
      >
        <svg
          className="w-3.5 h-3.5 mr-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Prev
      </Button>
      <p className="mr-3 flex items-center text-sm">
        Page {isNaN(currentPage) ? 0 : currentPage}/
        {isNaN(totalPage) ? 0 : totalPage}
      </p>
      <Button
        onClick={onClickButtonNext}
        className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={isButtonNextDisabled}
      >
        Next
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
