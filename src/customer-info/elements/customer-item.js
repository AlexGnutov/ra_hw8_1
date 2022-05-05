function CustomerItem(props) {
    const {data, active, onClick} = props;

    const onClickHandler = (e) => {
        if (typeof onClick === 'function') {
            onClick(data.id);
        }
    }

    return (
        <div className={active === data.id ? 'customer-item customer-item-active'
            : 'customer-item'} onClick={onClickHandler}>{data.name}</div>
    )
}

export default CustomerItem;
