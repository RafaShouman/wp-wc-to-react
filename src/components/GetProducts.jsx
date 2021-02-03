import { useState, useEffect } from 'react'
import ListProducts from './ListProducts'
import CategoryInfo from './CategoryInfo'
import Pagination from './Pagination'

function GetProducts({ brand }) {


    const [token, setToken] = useState(null)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({})
    const [actualOffset, setActualOffset] = useState(0)
    const [categoryInfo, setCategoryInfo] = useState({})

    // Busca categoria que será setada no Plugin do WP dentro do "data-id"
    var getCategoryInHtml = document.querySelector('.erw-root[data-id]').dataset.id;

    // Monta a URL para requisição. Pode mudar de acordo com os filtros, páginação ou busca
    let dynamicUrl = `https://a1404502c1prd-admin.occa.ocs.oraclecloud.com/ccadmin/v1/products?showInactiveProducts=false&categoryId=${getCategoryInHtml}&q=brand co "${brand}"&catalogId=cloudCatalog&includeChildren=true&limit=12&offset=${actualOffset}`


    // pega o Offset atual enviada pelo componente de paginação >> @Pagination.jsx
    function getOffsetFromChild(offsetArg) {
        setActualOffset(offsetArg)
    }

    useEffect(() => {
        // Função para solicitar o Token
        async function tokenFetch() {
            /* fetch(`http://localhost/_react/getToken.php`) */
            await fetch(`https://blog.webcontinental.com.br/provisorio/wc-products-req/getToken.php`, {
                method: 'GET',
                mode: 'cors',
            })
                .then(resp => {
                    return resp.json()
                })
                .then(resp => {
                    // Passa o token para @token
                    setToken(resp.access_token)
                })
                .catch(error => console.log(error));
        }
        // Solicita o Token
        tokenFetch()

        // Solicita os produtos/categoria para monatgem do Obj
        function getProducts(argToken, url) {
            // Monta o obj que será enviado no body da requisição
            let _data = {
                token: argToken,
                ulr: url,
                category: getCategoryInHtml,
                brandToFetch: brand
            }
            /* fetch(`http://localhost/_react/getProducts.php`) */
            fetch(`https://blog.webcontinental.com.br/provisorio/wc-products-req/getProducts.php`, {
                method: 'POST',
                body: JSON.stringify(_data),
                mode: 'cors',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
                }
            })
                .then(function (resp) {
                    return resp.json()
                })
                .then(function (resp) {
                    console.log('resp >>>', resp)
                    // Monta o obj para gerar categoria
                    setProducts(resp.items)
                    // Monta o obj para alimentar o componente de páginação @Pagination.jsx
                    setPagination({
                        totalResults: resp.totalResults,
                        limit: resp.limit,
                        offset: resp.offset,
                        links: resp.links
                    })
                    // Monta o obj para alimentar o componente @CategoryInfo.jsx
                    setCategoryInfo({
                        name: resp.category.displayName,
                        id: resp.category.id,
                        isActive: resp.category.active,
                        results: resp.totalResults
                    })
                })
                .catch(error => console.log(error));
        }

        //verifica se o token existe
        if (token) {
            getProducts(token, dynamicUrl)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, dynamicUrl])

    return (
        <>
            <div className="content">
                {categoryInfo && <CategoryInfo
                    name={categoryInfo.name}
                    id={categoryInfo.id}
                    isActive={categoryInfo.isActive}
                    results={categoryInfo.results} />
                }
                <div className="products">
                    {products && <ListProducts products={products} />}
                </div>
                {pagination && <Pagination
                    totalResults={pagination.totalResults}
                    limit={pagination.limit}
                    offset={pagination.offset}
                    links={pagination.links}
                    returnOffset={getOffsetFromChild}

                />}
            </div>
        </>
    )
}

export default GetProducts