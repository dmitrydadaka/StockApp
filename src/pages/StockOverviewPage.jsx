import { StockList } from '../components/StockList';
import { AutoComplete } from '../components/AutoComplete';
import trading from "../images/trading.png"

export const StockOverviewPage = () => {
    return (
        <div>
            <div className="text-center">
                <img src={trading} />
            </div>
            <AutoComplete />
            <StockList />
        </div>
    )
}
