import { useEffect, useState } from "react";

function Pagination({ totalResults, limit, offset, links, returnOffset }) {


    const pageNumbers = []
    //const If = props => props.check ? props.children : null;

    let [firstItem, setFirstItem] = useState()
    let [lastItem, setLastItem] = useState()

    for (let i = 1; i <= Math.ceil(totalResults / limit); i++) {
        pageNumbers.push(i);
    }

    function firstAndLast(arr) {
        setFirstItem(arr[0])
        setLastItem(arr[arr.length - 1])
    }
    function handleClickNumbers(event) {
        returnOffset(Number(event.target.dataset.offset))
    }
    function handleClickArrow(event) {
        console.log('offset >', offset, ' lastItem >', lastItem - 1)
        console.log('offset >', offset, ' firstItem >', firstItem - 1)

        let lessOrMore = event.target.dataset.offset

        if ((lessOrMore === 'less') && (offset > (firstItem - 1))) {
            returnOffset(offset - 1)
        }
        if ((lessOrMore === 'more') && (offset < (lastItem - 1))) {
            returnOffset(offset + 1)
        }
    }

    useEffect(() => {
        firstAndLast(pageNumbers)
    }, [totalResults, limit, offset, links, firstAndLast])


    return (
        <div className="pagination">

            {/* <If check={offset > (firstItem - 1)}>
                <li key={'less'} className='less' onClick={handleClickArrow}>←</li>
            </If> */}
            <li
                key={'less'}
                className={offset > (firstItem - 1) ? '' : 'disable'}
                data-offset='less'
                onClick={handleClickArrow}
            >←</li>

            {pageNumbers.map(pageNumber => {
                return (
                    <li
                        key={pageNumber}
                        data-offset={pageNumber - 1}
                        onClick={handleClickNumbers}
                        className={Number(offset) === (Number(pageNumber) - 1) ? 'active' : ''}
                    >
                        {pageNumber}
                    </li>
                )
            })}

            <li
                key={'more'}
                className={offset < (lastItem - 1) ? '' : 'disable'}
                data-offset='more'
                onClick={handleClickArrow}
            >→</li>
            {/* <If check={offset < (lastItem - 1)}>
                <li key={'more'} className='more' onClick={handleClickArrow}>→</li>
            </If> */}
        </div>
    )
}

export default Pagination