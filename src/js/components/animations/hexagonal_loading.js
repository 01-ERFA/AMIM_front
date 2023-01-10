import React from "react";
import "../../../styles/animations/hexagonal_loading.css"

const Hexagonal_loading = ()=>{

    function charger() {
        function charger_hexagons() {
            return(
                <>
                    <div className="hex-brick h1"></div>
                    <div className="hex-brick h2"></div>
                    <div className="hex-brick h3"></div>
                </>
            )
        }
        const hexagons = []
        for (let index = 0; index < 37; index++) {
            if (index < 6){
                hexagons.push(
                    <div key={index} className={"gel r1 c"+(Number(index)+1)}>
                        {charger_hexagons()}
                    </div>
                )
            }else if (index < 19){
                hexagons.push(
                    <div key={index} className={"gel r2 c"+(Number(index)+1)}>
                        {charger_hexagons()}
                    </div>
                )
            }else{
                hexagons.push(
                    <div key={index} className={"gel r3 c"+(Number(index)+1)}>
                        {charger_hexagons()}
                    </div>
                )
            } 
        }
        return (
            <div className="socket">
                <div className="gel center-gel">
                    {charger_hexagons()}
                </div>
                {hexagons.map((item)=>item)}
            </div>
        )
    }

    return (
        <>
            {charger()}
        </>
    )
}

export default Hexagonal_loading