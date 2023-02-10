import React, { useState, useEffect} from "react";


const Counter = (props)=>{


    const [counter, setCounter] = useState(props?.scaled === 'increase'?props?.min_range:props?.max_range);

    useEffect(()=>{
        if (typeof counter !== 'number') {
            setCounter(props?.scaled === 'increase'?props?.min_range:props?.max_range)
        }
        if (typeof counter === 'number') {
            setTimeout(() => {

                if (props?.scaled === 'decreases') {
                    if (counter > props?.min_range) {
                        setCounter(counter - props?.number)
                    }else {
                        setCounter(props?.max_range)
                    }
                }

                if (props?.scaled === 'increase') {
                    if (counter < props?.max_range) {
                        setCounter(counter + props?.number)
                    }else {
                        setCounter(props?.min_range)
                    }
                }

            }, 1000);
        }

    }, [counter])

    return (
        <span>{counter}</span>
    )
}

export default Counter