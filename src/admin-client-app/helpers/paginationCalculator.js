import Paginator from "paginator";
import compare from '../helpers/compare';

const ITEM_PER_PAGE = 3;
const NUMBER_OF_PAGINATION_LINK = 3;
const paginator = new Paginator(ITEM_PER_PAGE, NUMBER_OF_PAGINATION_LINK);

const paginatorBuild = (total, page) =>
{
    return paginator.build(total, page);
};

export const calculate = ({
    sortedBy = 'created_date',
    order = 'asc',
    page = 1,
    dataArray = [],
}) =>
{
    const copiedDataArray = dataArray.slice(0);

    const {
        first_result: firstResult,
        last_result: lastResult,
        pages,
        has_previous_page: hasPreviousPage,
        has_next_page: hasNextPage,
        total_pages: totalPages,
        previous_page: previousPage,
        next_page: nextPage,
        first_page: firstPage
    } = paginatorBuild(copiedDataArray.length, page);

    const sortedArray = copiedDataArray.sort(compare(sortedBy, order === "asc"));
    const sortedAndFilteredArray = sortedArray.slice(firstResult, lastResult + 1);
    const reverseOrder = order === 'asc' ? 'desc' : 'asc';

    return {
        firstResult,
        lastResult,
        pages,
        hasPreviousPage,
        hasNextPage,
        totalPages,
        previousPage,
        nextPage,
        firstPage,
        sortedArray,
        sortedAndFilteredArray,
        order,
        reverseOrder,
        sortedBy,
        page
    }
};