import { useEffect, useState } from 'react'
import axios from 'axios'

import { chunkArray } from 'utils/helpers/chunk-array'
import { fillEmptyArray } from 'utils/helpers/fill-empty-array'



const useImageSearch = ({
    debouncedQuery = '',
    limit = 21,
    offset,
}) => {
    const [imagesData, setImagesData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setImagesData([])
        setIsLoading(true)
    }, [debouncedQuery])

    useEffect(() => {
        // if (isLoading) return

        setIsLoading(true)
        axios({
            method: 'GET',
            url: debouncedQuery.length ? 'https://api.giphy.com/v1/gifs/search' : 'https://api.giphy.com/v1/gifs/trending',
            params: {
                api_key: process.env.REACT_APP_GIPHY_API_KEY,
                q: debouncedQuery,
                limit,
                offset
            }
        }).then(data => {
            setIsLoading(false)
            setHasMore(data.data.pagination.count === limit)
            setImagesData(prevState => {
                if (data.data.data.length) {
                    const chunkedArray = chunkArray(data.data.data, 3)
                    const newArray = prevState.length ? [...prevState] : fillEmptyArray([], 3)
                    chunkedArray.forEach((arr, index) => {
                        return newArray[index] = newArray[index].concat(chunkedArray[index])
                    })
                    return newArray
                } else return []
            })
        }).catch(err => {
            setIsLoading(false)
            setError(true)
        })

    }, [limit, offset, debouncedQuery])

    return { imagesData, isLoading, hasMore, error }
}

export default useImageSearch
