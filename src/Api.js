import {api} from "@yosmy/request";
import {Platform} from "@yosmy/ui";

export default {
    collectContactsAsClient: (
        base,
        token
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-contacts-as-client",
                token,
                {
                    
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectContactsAsOperator: (
        base,
        token,
        ids,
        users
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-contacts-as-operator",
                token,
                {
                    ids : ids,
                    users : users
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectCountries: (
        base,
        isos
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-countries",
                null,
                {
                    isos : isos
                },
                {
                    get: Platform.store.get,
                    set: Platform.store.set,
                    expiry: '1 month'
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectMetadatas: (
        base
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-metadatas",
                null,
                {
                    
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectProducts: (
        base,
        provider
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-products",
                null,
                {
                    provider : provider
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectPromotions: (
        base,
        providers,
        start
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-promotions",
                null,
                {
                    providers : providers,
                    start : start
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectProviders: (
        base,
        ids,
        country
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-providers",
                null,
                {
                    ids : ids,
                    country : country
                },
                {
                    get: Platform.store.get,
                    set: Platform.store.set,
                    expiry: '1 month'
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectTopupsAsClient: (
        base,
        token,
        contact
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-topups-as-client",
                token,
                {
                    contact : contact
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectTopupsByContactsAsOperator: (
        base,
        token,
        contacts
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-topups-by-contacts-as-operator",
                token,
                {
                    contacts : contacts
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectTopupsByDateAsOperator: (
        base,
        token,
        from,
        to
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-topups-by-date-as-operator",
                token,
                {
                    from : from,
                    to : to
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectTopupsByPhoneAsOperator: (
        base,
        token,
        phone
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-topups-by-phone-as-operator",
                token,
                {
                    phone : phone
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    collectTopupsByStripeAsOperator: (
        base,
        token,
        stripe
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/collect-topups-by-stripe-as-operator",
                token,
                {
                    stripe : stripe
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    deleteContact: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/delete-contact",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    detectProviders: (
        base,
        prefix,
        account,
        type
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/detect-providers",
                null,
                {
                    prefix : prefix,
                    account : account,
                    type : type
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    findProviders: (
        base,
        country,
        prefix,
        account,
        type
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/find-providers",
                null,
                {
                    country : country,
                    prefix : prefix,
                    account : account,
                    type : type
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    forwardRequest: (
        base,
        method,
        uri,
        options
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/forward-request",
                null,
                {
                    method : method,
                    uri : uri,
                    options : options
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickContactAsClient: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-contact-as-client",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickContactAsOperator: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-contact-as-operator",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickCountry: (
        base,
        iso
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-country",
                null,
                {
                    iso : iso
                },
                {
                    get: Platform.store.get,
                    set: Platform.store.set,
                    expiry: '1 hour'
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickMetadata: (
        base,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-metadata",
                null,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickProduct: (
        base,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-product",
                null,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickProvider: (
        base,
        id,
        product
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-provider",
                null,
                {
                    id : id,
                    product : product
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    pickTopup: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/pick-topup",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    refundTopup: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/refund-topup",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    resolveProducts: (
        base,
        provider
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/resolve-products",
                null,
                {
                    provider : provider
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    resolvePromotions: (
        base,
        prefix,
        account,
        provider
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/resolve-promotions",
                null,
                {
                    prefix : prefix,
                    account : account,
                    provider : provider
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    sendDelayedTopup: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/send-delayed-topup",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    sendTopup: (
        base,
        token,
        country,
        account,
        type,
        product,
        amount,
        card
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/send-topup",
                token,
                {
                    country : country,
                    account : account,
                    type : type,
                    product : product,
                    amount : amount,
                    card : card
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    testTopup: (
        base,
        prefix,
        account,
        provider
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/test-topup",
                null,
                {
                    prefix : prefix,
                    account : account,
                    provider : provider
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    trySendingTopupAgain: (
        base,
        token,
        id
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/try-sending-topup-again",
                token,
                {
                    id : id
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    updateContact: (
        base,
        token,
        id,
        name
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/update-contact",
                token,
                {
                    id : id,
                    name : name
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    updateMetadata: (
        base,
        token,
        id,
        value
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/update-metadata",
                token,
                {
                    id : id,
                    value : value
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    validateAccount: (
        base,
        account,
        type
    ) => {
        return new Promise((resolve, reject) => {
            api(
                base + "/validate-account",
                null,
                {
                    account : account,
                    type : type
                }
            )
                .then((response) => {
                    const {code, payload} = response;
    
                    switch (code) {
                        case "success":
                            resolve(payload);
    
                            break;
                        default:
                            reject(response);
                    }
                })
                .catch(reject)
        });
    },
    http: {
        sayHello: (
            base
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/",
                    null,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        }
    },
    blacklist: {
        log: {
            collectEvents: (
                base,
                token,
                from,
                to,
                limit
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/blacklist/log/collect-events",
                        token,
                        {
                            from : from,
                            to : to,
                            limit : limit
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        }
    },
    country: {
        collectPhotos: (
            base,
            country
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/country/collect-photos",
                    null,
                    {
                        country : country
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        deletePhoto: (
            base,
            token,
            id
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/country/delete-photo",
                    token,
                    {
                        id : id
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        pickPhoto: (
            base,
            country
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/country/pick-photo",
                    null,
                    {
                        country : country
                    },
                    {
                        get: Platform.store.get,
                        set: Platform.store.set,
                        expiry: '1 day'
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        uploadPhoto: (
            base,
            token,
            country,
            data
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/country/upload-photo",
                    token,
                    {
                        country : country,
                        data : data
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        }
    },
    promotion: {
        updateTitle: (
            base,
            id,
            title
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/promotion/update-title",
                    null,
                    {
                        id : id,
                        title : title
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        }
    },
    reseller: {
        addAgent: (
            base,
            token,
            name
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/add-agent",
                    token,
                    {
                        name : name
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectAgentsAsAdmin: (
            base,
            token
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-agents-as-admin",
                    token,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectAgentsAsReseller: (
            base,
            token
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-agents-as-reseller",
                    token,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectProviders: (
            base,
            token
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-providers",
                    token,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectTopupsAsAdmin: (
            base,
            token,
            from,
            to,
            agents
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-topups-as-admin",
                    token,
                    {
                        from : from,
                        to : to,
                        agents : agents
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectTopupsAsReseller: (
            base,
            token,
            from,
            to,
            agents
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-topups-as-reseller",
                    token,
                    {
                        from : from,
                        to : to,
                        agents : agents
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectTransactionsAsAdmin: (
            base,
            token,
            user,
            from,
            to,
            limit
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-transactions-as-admin",
                    token,
                    {
                        user : user,
                        from : from,
                        to : to,
                        limit : limit
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectTransactionsAsReseller: (
            base,
            token,
            from,
            to,
            limit
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-transactions-as-reseller",
                    token,
                    {
                        from : from,
                        to : to,
                        limit : limit
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        collectUsers: (
            base,
            token
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/collect-users",
                    token,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        deleteAgent: (
            base,
            token,
            id
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/delete-agent",
                    token,
                    {
                        id : id
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        executeTransaction: (
            base,
            token,
            user,
            amount,
            reference
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/execute-transaction",
                    token,
                    {
                        user : user,
                        amount : amount,
                        reference : reference
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        pickUserAsAdmin: (
            base,
            token,
            user
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/pick-user-as-admin",
                    token,
                    {
                        user : user
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        pickUserAsReseller: (
            base,
            token
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/pick-user-as-reseller",
                    token,
                    {
                        
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        sendTopup: (
            base,
            token,
            agent,
            country,
            account,
            product,
            amount
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/send-topup",
                    token,
                    {
                        agent : agent,
                        country : country,
                        account : account,
                        product : product,
                        amount : amount
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        addProvider: (
            base,
            token,
            id,
            user,
            discount
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/reseller/user/add-provider",
                    token,
                    {
                        id : id,
                        user : user,
                        discount : discount
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        updateAgent: (
            base,
            token,
            id,
            name
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/update-agent",
                    token,
                    {
                        id : id,
                        name : name
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        }
    },
    topup: {
        generateReceipt: (
            base,
            token,
            topup
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/topup/generate-receipt",
                    token,
                    {
                        topup : topup
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        }
    },
    userland: {
        blacklist: {
            banUser: (
                base,
                token,
                user
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/blacklist/ban-user",
                        token,
                        {
                            user : user
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUserAsOperator: (
                base,
                token,
                id
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/blacklist/pick-user-as-operator",
                        token,
                        {
                            id : id
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        },
        completeAuthentication: (
            base,
            referral,
            session,
            country,
            prefix,
            number,
            code
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/userland/complete-authentication",
                    null,
                    {
                        referral : referral,
                        session : session,
                        country : country,
                        prefix : prefix,
                        number : number,
                        code : code
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        log: {
            collectEvents: (
                base,
                token,
                user
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/log/collect-events",
                        token,
                        {
                            user : user
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        },
        phone: {
            collectUsers: (
                base,
                token,
                ids
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/phone/collect-users",
                        token,
                        {
                            ids : ids
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUserAsClient: (
                base,
                token
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/phone/pick-user-as-client",
                        token,
                        {
                            
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUserAsOperator: (
                base,
                token,
                id
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/phone/pick-user-as-operator",
                        token,
                        {
                            id : id
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        },
        processResellerAuthentication: (
            base,
            country,
            prefix,
            number,
            password
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/userland/process-reseller-authentication",
                    null,
                    {
                        country : country,
                        prefix : prefix,
                        number : number,
                        password : password
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        push: {
            assignUser: (
                base,
                token,
                push
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/push/assign-user",
                        token,
                        {
                            push : push
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        },
        referral: {
            addUser: (
                base,
                token
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/referral/add-user",
                        token,
                        {
                            
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            computeReferrals: (
                base,
                token,
                from,
                to,
                group
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/referral/compute-referrals",
                        token,
                        {
                            from : from,
                            to : to,
                            group : group
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            computeTopups: (
                base,
                token,
                from,
                to,
                group
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/referral/compute-topups",
                        token,
                        {
                            from : from,
                            to : to,
                            group : group
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUser: (
                base,
                token
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/referral/pick-user",
                        token,
                        {
                            
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            user: {
                addReferral: (
                    base,
                    token,
                    code
                ) => {
                    return new Promise((resolve, reject) => {
                        api(
                            base + "/userland/referral/user/add-referral",
                            token,
                            {
                                code : code
                            }
                        )
                            .then((response) => {
                                const {code, payload} = response;
                
                                switch (code) {
                                    case "success":
                                        resolve(payload);
                
                                        break;
                                    default:
                                        reject(response);
                                }
                            })
                            .catch(reject)
                    });
                }
            }
        },
        registration: {
            computeUsers: (
                base,
                token,
                from,
                to,
                group
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/registration/compute-users",
                        token,
                        {
                            from : from,
                            to : to,
                            group : group
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUserAsOperator: (
                base,
                token,
                id
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/registration/pick-user-as-operator",
                        token,
                        {
                            id : id
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        },
        startAuthentication: (
            base,
            prefix,
            number
        ) => {
            return new Promise((resolve, reject) => {
                api(
                    base + "/userland/start-authentication",
                    null,
                    {
                        prefix : prefix,
                        number : number
                    }
                )
                    .then((response) => {
                        const {code, payload} = response;
        
                        switch (code) {
                            case "success":
                                resolve(payload);
        
                                break;
                            default:
                                reject(response);
                        }
                    })
                    .catch(reject)
            });
        },
        stripe: {
            card: {
                collectErrors: (
                    base,
                    token,
                    user,
                    from,
                    to
                ) => {
                    return new Promise((resolve, reject) => {
                        api(
                            base + "/userland/stripe/card/collect-errors",
                            token,
                            {
                                user : user,
                                from : from,
                                to : to
                            }
                        )
                            .then((response) => {
                                const {code, payload} = response;
                
                                switch (code) {
                                    case "success":
                                        resolve(payload);
                
                                        break;
                                    default:
                                        reject(response);
                                }
                            })
                            .catch(reject)
                    });
                }
            },
            collectCardsAsClient: (
                base,
                token
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/stripe/collect-cards-as-client",
                        token,
                        {
                            
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            collectCardsAsOperator: (
                base,
                token,
                user
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/stripe/collect-cards-as-operator",
                        token,
                        {
                            user : user
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            deleteCard: (
                base,
                token,
                id
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/stripe/delete-card",
                        token,
                        {
                            id : id
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            pickUserAsOperator: (
                base,
                token,
                user
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/stripe/pick-user-as-operator",
                        token,
                        {
                            user : user
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            },
            setupCard: (
                base,
                token,
                number,
                name,
                month,
                year,
                cvc,
                zip,
                save
            ) => {
                return new Promise((resolve, reject) => {
                    api(
                        base + "/userland/stripe/setup-card",
                        token,
                        {
                            number : number,
                            name : name,
                            month : month,
                            year : year,
                            cvc : cvc,
                            zip : zip,
                            save : save
                        }
                    )
                        .then((response) => {
                            const {code, payload} = response;
            
                            switch (code) {
                                case "success":
                                    resolve(payload);
            
                                    break;
                                default:
                                    reject(response);
                            }
                        })
                        .catch(reject)
                });
            }
        }
    }
};