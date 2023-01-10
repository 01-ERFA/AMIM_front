const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            basename: process.env.BASENAME || "/",

            storage: {

            },

            start: {
                started: localStorage.getItem('start') === undefined? localStorage.getItem('start'):false
            },


            //
        }, 
        actions: {

            started: ()=>{

                //
                setStore({
                    start:{
                        started: true
                    }
                })

            },



            //
        }
    }
}

export default getState;