import {useEffect, useState} from "react";

function CustomersDetails(props) {
    const {id} = props;
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const reply = await fetch(`${process.env.REACT_APP_USER_URL}${id}.json`);
                if (!reply.ok) console.log(reply.statusText);
                const data = await reply.json();
                setData(data);
            } catch (e) {
                console.log(e.message);
            }
        }
        if (id) {
            setLoading(true);
            fetchData();
        } else {
            setData(null);
        }
    }, [id]);

    const onImageLoad = () => {
        setLoading(false);
    }

    return (
        <>
            { isLoading ?
                <div className={'loading-element'}>
                    <div>Loading</div>
                </div> : null }
            {data ?
                <>
                    <img key={data.id} src={data['avatar']} alt={''}
                         className={'customer-details-image'} onLoad={onImageLoad}/>
                    <p>{'Name: ' + data.name}</p>
                    <p>{'City: ' + data.details.city}</p>
                    <p>{'Company: ' + data.details.company}</p>
                    <p>{'Position: ' + data.details.position}</p>
                </>
                : null}
        </>
    )

}

export default CustomersDetails;
