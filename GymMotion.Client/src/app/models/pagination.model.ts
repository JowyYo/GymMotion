export interface IPagination<T> {
    page: number
    pageSize: number
    totalPages: number
    totalItems: number
    items: T[]
}