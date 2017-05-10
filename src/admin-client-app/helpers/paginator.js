import Paginator from "paginator";

const ITEM_PER_PAGE = 15;
const NUMBER_OF_PAGINATION_LINK = 3;
const paginator = new Paginator(ITEM_PER_PAGE, NUMBER_OF_PAGINATION_LINK);

export const build = (total, page) =>
{
    return paginator.build(total, page);
};