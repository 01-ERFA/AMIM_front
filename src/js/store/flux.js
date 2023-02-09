import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // main data
            basename: process.env.BASENAME || "/",
            api_url: 'http://127.0.0.1:4000/api/',

            // animations
            started_animation: false,

            // pages and objects
            language: localStorage.getItem('language') === null || localStorage.getItem('language') === undefined
                ? undefined
                :localStorage.getItem('language'),


            // user

            b_login: false,
            token: undefined,



            // alerts and others
            reconnection_time: 10000,
            connected_server_0: true,
        }, 
        actions: {

            webApp: {

                // disconnection:  {
                //     validation: (condition, status_true, status_false)=>{
                //         if(condition === true){
                //             try {
                //                 status_true()
                //             } catch (error) {
                //             } //finally{

                //            // }
                //         }
                //         if (status === false) {
                //             try {
                //                 status_false()
                //             } catch (error) {
                //             }
                //         }
                //     },

                //     validation: (condition, value, action)=>{
                //         console.log(condition, value, action)

                //         if (condition) {
                            
                //         }

                //     },
                // },

                loading: {
                    languages: async ()=>{
                        const response = await getActions().requests.loading()
                        const local_actions = {
                            'conection_success': ()=>{
                                getStore().connected_server_0 === true
                                    ?null
                                    :getActions().alerts.connected_server_0()

                                setStore({ language: response?.data?.languages })
                            },
                            'conection_failed': ()=>{
                                getActions().alerts.disconnected_server_0()
                                getActions().webApp.others.set_reconnection_time(getStore().reconnection_time*2)
                                setTimeout(() => {
                                    getActions().webApp.loading.languages()
                                }, getStore().reconnection_time);
                            }
                        }

                        getActions().webApp.others.validation(
                            response !== false || response?.status !== undefined,
                            ()=>getActions().webApp.others.validation(
                                response?.status === 200,
                                ()=>local_actions.conection_success(),
                                ()=>local_actions.conection_failed()
                            ),
                            ()=>local_actions.conection_failed())

                        // if(response !== false || response?.status !== undefined){
                        //     if (response?.status === 200) {
                        //         local_actions.conection_success()
                        //     } else {
                        //         local_actions.conection_failed()
                        //     }
                        // }else{
                        //     local_actions.conection_failed()
                        // }
                    },

                    starting: (id_language)=>{

                        console.log('starting', id_language)
                        console.log(getStore().language);

                        if (getStore().language === undefined) {
                            console.log(true)
                        }




                        // localStorage.setItem('laguage', id_language)

                    },
                    
                    login: ()=>{

                    },
                    
                    pages: ()=>{

                    },
                    
                    redirect: ()=>{

                    },

                    // 
                },
                
                // localStorage: 
                // {

                //     get: ()=>{
                //         localStorage.getItem()
                //     },

                //     save: (id, value)=>{
                //         localStorage.setItem(id, value)
                //     },
                //     delete: (id)=>{
                //         localStorage.removeItem(id)
                //     }
                
                // },
                
                // {
                //     language: (value)=>{
                //         localStorage.setItem('language', value)
                //     },
                //     token_login: (value)=>{
                //         console.log(value)
                //     },
                //     settings: (value)=>{
                //         console.log(value)
                //     },
                //     pathname: (value)=>{
                //         console.log(value)
                //     }
                // } ,
                

                //
                
                others: {
                    validation: (condition, status_true, status_false)=>{
                        if(condition === true){
                            try {
                                status_true()
                            } catch (error) {
                            } //finally{

                           // }
                        }
                        if (condition === false) {
                            try {
                                status_false()
                            } catch (error) {
                            } //finally{

                           // }
                        }
                    },
                    set_reconnection_time: (new_time)=>{
                        console.log(new_time)
                        setStore({ reconnection_time: new_time })
                    },
                },

            },


            animations: {
                loading: ()=>{
                    setStore({ started_animation:true })
                },

                //
            },

            alerts: {
                disconnected_server_0:()=>{
                    setStore({ connected_server_0: false })
                },
                connected_server_0:()=>{
                    setStore({ connected_server_0: true })
                },

                //
            },

            requests: {
                loading: async ()=>{
                    try {
                        const response = await axios.get(getStore().api_url+'loading');
                        return response;
                      } catch (error) {
                        console.log(error);
                        return false;
                      }
                    },


                    //
                }


            //
        }
    }
}

export default getState;