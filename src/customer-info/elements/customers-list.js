import {useEffect, useState} from "react";
import CustomerItem from "./customer-item";
import CustomersDetails from "./customers-details";

function CustomersList(props) {

    const [list, setList] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const reply = await fetch(process.env.REACT_APP_LIST_URL);
            if (!reply.ok) console.log(reply.statusText);
            const data = await reply.json();
            setList(data);
        }
        fetchData();
    }, []);

    const showDetails = (id) => {
        console.log('show details ', id);
        if (id === user) {
            setUser(null);
            return;
        }
        setUser(id);
    }

    return (
        <div className={'customers-info'}>
            <div className={'customers-list'}>
                {list.map(data =>
                    <div key={data.id}>
                        <CustomerItem data={data} onClick={showDetails} active={user}/>
                    </div>
                )}
            </div>
            <div className={'customer-details'}>
                <CustomersDetails id={user}/>
            </div>
        </div>
    )
}

export default CustomersList;
