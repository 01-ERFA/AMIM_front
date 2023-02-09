import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // env data
            basename: process.env.BASENAME || "/",
            api_url: 'http://127.0.0.1:4000/api/',

            
            // pages and objects
            pathname: undefined,
            settings: undefined,


            language: localStorage.getItem('language') === null || localStorage.getItem('language') === undefined
            ? undefined
            :localStorage.getItem('language'),
            
            
            // user
            logged_in: undefined,
            token_login: undefined,
            
            
            // animations
            started_animation: false,

            // alerts and others
            reconnection_time: 10000,
            connected_server_0: true,
        }, 
        actions: {

            testing: {
                testing_localStorage: ()=>{
                    getActions().localStorage.post('test', 'testLocalStorage')

                    console.log(getActions().localStorage.get('test'))

                    getActions().localStorage.put('test', 'test success')

                    console.log(getActions().localStorage.get('test'))

                    getActions().localStorage.delete('test')

                    console.log(getActions().localStorage.get('test'))

                    getActions().localStorage.post('test', {
                        test: 'testing object'
                    })
                    console.log(getActions().localStorage.get('test'))

                    getActions().localStorage.post({}, 'hola')

                    console.log(getActions().localStorage.get({test: 'hola'}))

                },
            },

            localStorage: {
                get: (item)=>{
                    return JSON.parse(localStorage.getItem(item))
                },
                post: (item, value)=>{
                    if (typeof item !== 'string') {
                        return false
                    }
                    localStorage.setItem(item, JSON.stringify(value))
                    return true
                },
                delete: (item)=>{
                    localStorage.removeItem(item)
                },
                put: (item, new_value)=>{
                  getActions().localStorage.delete(item)
                  getActions().localStorage.post(item, new_value)
                },
            },

            webApp: {

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
                    },

                    starting: (id_language)=>{

                        console.log('starting', id_language)
                        console.log(getStore().language);

                        if (getStore().language === undefined) {
                            console.log(true)
                        }

                    },
                    
                    login: ()=>{

                    },
                    
                    pages: ()=>{

                    },
                    
                    redirect: ()=>{

                    },

                    // 
                },
                
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