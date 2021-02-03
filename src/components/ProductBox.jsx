import {
    BrowserRouter as Router,
    Link,
    /* Switch,
    Route,
    useParams */
} from "react-router-dom";
function ProductBox({ displayName, primaryFullImageURL, link }) {

    return (
        <article className="wc-product">
            <Router>
                <Link to={{ pathname: `https://www.webcontinental.com.br${link}` }} target="_blank" >
                    <img src={`https://www.webcontinental.com.br/${primaryFullImageURL}`} alt="" />
                    <h3>{displayName}</h3>
                </Link>
            </Router>
        </article>
    )

}

export default ProductBox