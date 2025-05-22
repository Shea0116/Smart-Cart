import { getHistoryList, setHistoryList } from "@/utils/storage"

export default {
    namespaced: true,
    state () {
        return {
            searchInfo: getHistoryList()
        }
    },
    mutations: {
        setSearchHistoryList ( state, obj ) {
            state.searchInfo = obj
            setHistoryList(obj)
          },
    },
    actions: {},
}