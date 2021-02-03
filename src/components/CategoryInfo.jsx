function CategoryInfo({ name, id, isActive, results }) {

    return (
        <>
            <h2 className={id}>{name}</h2>
            <span>Total de resultados {results}</span>
        </>
    )
}
export default CategoryInfo