import { createContext, useEffect, useState } from 'react';

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {

    const [watchList, setWatchList] = useState(localStorage.getItem('watchList')?.split(',') || ['MSFT', 'AMZN', 'GOOGL']);

    useEffect(() => {
        localStorage.setItem('watchList', watchList);
    }, [watchList]);

    const addStock = (stock) =>  {
        if(watchList.indexOf(stock) === -1) {
        setWatchList([...watchList, stock])
        }
    }
    const deleteStock = (stock) => {
        setWatchList(watchList.filter( item => item !== stock))
    }

    return <WatchListContext.Provider value={{ watchList, addStock, deleteStock }}>{ props.children }</WatchListContext.Provider>
}