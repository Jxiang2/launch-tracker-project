import { ParsedQs } from "qs";

const DEFAULT_PAGE_NUMBER: number = 1;
const DEFAULT_PAGE_LIMIT: number = 25;

export default function applyPaginator (query: ParsedQs) {
    const limit = Math.abs(Number(query.limit)) || DEFAULT_PAGE_LIMIT;
    const page = Math.abs(Number(query.page)) || DEFAULT_PAGE_NUMBER;
    // number of documents to skip
    const skip = (page - 1) * limit;

    return {
        skip: skip,
        limit: limit
    };
}