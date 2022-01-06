import { isReachedBottom } from './reachedBottom'
export function isreachedBottom(distance: number): boolean {
    return isReachedBottom(distance)
}
export interface AutoLoader<T> {
    isFirstLoading?: boolean;
    loading: boolean
    dataList: Array<T>
    page: number
    pageSize: number
    nomore: boolean
    reachedBottom: () => void
}
export function initAutoLoader<T>(loader: AutoLoader<T>) {
    loader.isFirstLoading = true
    loader.dataList = []
    loader.loading = false
    loader.nomore = false
    loader.page = 0
}

export function loaderReachedBottom<T>(loader: AutoLoader<T>, getMore: (q: { page: number, pageSize: number }) => Promise<T[]>) {
    if (loader.loading || loader.nomore) return
    loader.loading = true
    getMore({
        page: loader.page++,
        pageSize: loader.pageSize
    }).then(res => {
        addMore(loader, res)
    }).catch(err => {
        console.log(err);
    }).finally(() => {
        loader.loading = false
    })
}

function addMore<T>(loader: AutoLoader<T>, val: T[]) {
    // console.log(val);
    if (!val || val.length < loader.pageSize) {
        loader.nomore = true
    }
    for (const i of val) {
        loader.dataList.push(i)
    }
}