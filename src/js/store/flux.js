import axios from "axios";
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // env data
            basename: process.env.BASENAME || '/',
            api_url: 'http://127.0.0.1:4000/api/',

            
            // pages and objects
            browserRouter: undefined,
            pathname: undefined,
            settings: undefined,


            language: undefined,
            
            
            // user
            logged_in: undefined,
            token_login: undefined,
            

            // alerts and others
            reconnection_time: undefined,
            connected_server_0: undefined,
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
                },
            },

            webApp: {
                connection: {
                    connect: async (status_true, status_false)=>{
                        const response = await getActions().requests.ping()
                        return getActions().webApp.others.validation(
                            response?.data?.status === true,
                            ()=>{
                                getActions().webApp.store.alerts.connected_server_0(true);
                                status_true()
                            },
                            ()=>getActions().webApp.connection.reconnect(status_false)
                        )
                    },
                    reconnect: (action)=>{
                        getActions().webApp.store.alerts.connected_server_0(false)
                        setTimeout(() => {
                            try {
                                action()
                            } catch (error) {
                            }
                        }, getStore().reconnection_time);
                    },
                },

                store: {
                    alerts: {
                        connected_server_0:(value)=>{
                            setStore({ connected_server_0: value })
                        },
                    },

                    browserRouter: (value)=>{
                        setStore( { browserRouter: value } )
                    },

                    language: (value)=>{
                        setStore( { language: value } )
                    },

                    pathname: (value)=>{
                        setStore( { pathname: value === undefined
                            ? location.pathname
                            : value
                         })
                    },

                    set_reconnection_time: (value)=>{
                        setStore({ reconnection_time: value })
                    },
                },

                onLoad: async ()=>{
                    const webApp = getActions().webApp
                    const lS = getActions().localStorage

                    webApp.store.set_reconnection_time(10000)
                    await webApp.store.pathname()


                    lS.post('pathname', getStore().pathname)
                    
                    await webApp.connection.connect(
                        ()=>{
                            webApp.site.languages()
                            // webApp.store.browserRouter(0)
                        }, 
                        ()=>{
                            webApp.onLoad()
                        })

                },

                site: {
                    languages: async ()=>{
                        const response = await getActions().requests.loading()
                        getActions().webApp.others.validation(
                            response !== false || response?.status !== undefined,
                            ()=>getActions().webApp.others.validation(
                                response?.status === 200,
                                ()=>getActions().webApp.connection.connect(
                                    ()=>getActions().webApp.store.language(response?.data?.languages),
                                    ()=>getActions().webApp.site.languages()
                                ),
                                ()=>getActions().webApp.connection.reconnect(
                                    ()=>getActions().webApp.site.languages()
                                )
                            ),
                            ()=>getActions().webApp.connection.reconnect(
                                ()=>getActions().webApp.site.languages()
                            )
                        )
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
                            } finally {
                                return true
                            }
                        }
                        if (condition === false) {
                            try {
                                status_false()
                            } catch (error) {
                            } finally {
                                return false
                            }
                        }
                    },
                },

            },

            requests: {
                loading: async ()=>{
                    try {
                        const response = await axios.get(getStore().api_url+'loading');
                        return response;
                      } catch (error) {
                        // console.log(error);
                        return false;
                      }
                    },
                ping: async ()=>{
                    try {
                        const response = await axios.get(getStore().api_url+'ping')
                        return response;
                    } catch (error) {
                        return false;
                    }
                },


                    //
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


            //
        }
    }
}

export default getState;