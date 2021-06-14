import React from "react";


type ButtonType = {
    callBack: () => void
    value: string
}
const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickHandler}>{props.value}</button>
    )
}

export default Button;

