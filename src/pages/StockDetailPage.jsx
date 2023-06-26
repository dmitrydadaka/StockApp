import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import finnHub from '../apis/finnHub';
import { StockChart } from '../components/StockChart';
import { StockData } from '../components/StockData';


const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: Math.floor(data.c[index])
        }
    })
}

export const StockDetailPage = () => {
    const [chartData, setChartData] = useState();

    const { symbol } = useParams();

    useEffect(() => {

        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() / 1000);
            let daysAgo = currentTime - 24 * 60 * 60;
            if (date.getDay() === 6) {
                daysAgo = currentTime - 2 * 24 * 60 * 60;
            }
            if (date.getDay() === 0) {
                daysAgo = currentTime - 3 * 24 * 60 * 60;
            }
            const oneWeekAgo = currentTime - 7 * 24 * 60 * 60;
            const oneYearAgo = currentTime - 365 * 24 * 60 * 60;

            try {
                const responses = await Promise.all(
                    [
                        finnHub.get('stock/candle', {
                            params: {
                                symbol,
                                from: daysAgo,
                                to: currentTime,
                                resolution: 30
                            }
                        }),
                        finnHub.get('stock/candle', {
                            params: {
                                symbol,
                                from: oneWeekAgo,
                                to: currentTime,
                                resolution: 60
                            }
                        }),
                        finnHub.get('stock/candle', {
                            params: {
                                symbol,
                                from: oneYearAgo,
                                to: currentTime,
                                resolution: 'W'
                            }
                        })
                    ]);
                    console.log(responses[0].data)
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
            } catch (error) {
                console.log(error);
            }


        }
        fetchData();
    }, [symbol])

    return (
        <div>
            {chartData &&
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol}/>
                </div>}
        </div>
    )
}
