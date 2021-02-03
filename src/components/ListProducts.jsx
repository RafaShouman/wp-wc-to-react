import ProductBox from './ProductBox'
//  Componente para exibir os obj dos produtos
function ListProducts({ products }) {
  
    return (
        <>
            {products && products.map((prod) => {
                return (
                    <ProductBox
                        key={prod.id}
                        displayName={prod.displayName}
                        primaryFullImageURL={prod.primaryFullImageURL}
                        link={prod.route}
                    ></ProductBox>

                )
            })}
        </>
    )
}

export default ListProducts