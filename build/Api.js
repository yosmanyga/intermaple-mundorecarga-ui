"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require("@yosmy/request");

var _ui = require("@yosmy/ui");

exports.default = {
    collectContactsAsClient: function collectContactsAsClient(base, token) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-contacts-as-client", token, {}).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectContactsAsOperator: function collectContactsAsOperator(base, token, ids, users) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-contacts-as-operator", token, {
                ids: ids,
                users: users
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectCountries: function collectCountries(base, isos) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-countries", null, {
                isos: isos
            }, {
                get: _ui.Platform.store.get,
                set: _ui.Platform.store.set,
                expiry: '1 month'
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectMetadatas: function collectMetadatas(base) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-metadatas", null, {}).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectProducts: function collectProducts(base, provider) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-products", null, {
                provider: provider
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectPromotions: function collectPromotions(base, providers, start) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-promotions", null, {
                providers: providers,
                start: start
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectProviders: function collectProviders(base, ids, country) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-providers", null, {
                ids: ids,
                country: country
            }, {
                get: _ui.Platform.store.get,
                set: _ui.Platform.store.set,
                expiry: '1 month'
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectTopupsAsClient: function collectTopupsAsClient(base, token, contact) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-topups-as-client", token, {
                contact: contact
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectTopupsByContactsAsOperator: function collectTopupsByContactsAsOperator(base, token, contacts) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-topups-by-contacts-as-operator", token, {
                contacts: contacts
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectTopupsByDateAsOperator: function collectTopupsByDateAsOperator(base, token, from, to) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-topups-by-date-as-operator", token, {
                from: from,
                to: to
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectTopupsByPhoneAsOperator: function collectTopupsByPhoneAsOperator(base, token, phone) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-topups-by-phone-as-operator", token, {
                phone: phone
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    collectTopupsByStripeAsOperator: function collectTopupsByStripeAsOperator(base, token, stripe) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/collect-topups-by-stripe-as-operator", token, {
                stripe: stripe
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    deleteContact: function deleteContact(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/delete-contact", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    detectProviders: function detectProviders(base, prefix, account, type) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/detect-providers", null, {
                prefix: prefix,
                account: account,
                type: type
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    findProviders: function findProviders(base, country, prefix, account, type) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/find-providers", null, {
                country: country,
                prefix: prefix,
                account: account,
                type: type
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    forwardRequest: function forwardRequest(base, method, uri, options) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/forward-request", null, {
                method: method,
                uri: uri,
                options: options
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickContactAsClient: function pickContactAsClient(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-contact-as-client", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickContactAsOperator: function pickContactAsOperator(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-contact-as-operator", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickCountry: function pickCountry(base, iso) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-country", null, {
                iso: iso
            }, {
                get: _ui.Platform.store.get,
                set: _ui.Platform.store.set,
                expiry: '1 hour'
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickMetadata: function pickMetadata(base, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-metadata", null, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickProduct: function pickProduct(base, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-product", null, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickProvider: function pickProvider(base, id, product) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-provider", null, {
                id: id,
                product: product
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    pickTopup: function pickTopup(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/pick-topup", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    refundTopup: function refundTopup(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/refund-topup", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    resolveProducts: function resolveProducts(base, provider) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/resolve-products", null, {
                provider: provider
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    resolvePromotions: function resolvePromotions(base, prefix, account, provider) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/resolve-promotions", null, {
                prefix: prefix,
                account: account,
                provider: provider
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    sendDelayedTopup: function sendDelayedTopup(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/send-delayed-topup", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    sendTopup: function sendTopup(base, token, country, account, type, product, amount, card) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/send-topup", token, {
                country: country,
                account: account,
                type: type,
                product: product,
                amount: amount,
                card: card
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    testTopup: function testTopup(base, prefix, account, provider) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/test-topup", null, {
                prefix: prefix,
                account: account,
                provider: provider
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    trySendingTopupAgain: function trySendingTopupAgain(base, token, id) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/try-sending-topup-again", token, {
                id: id
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    updateContact: function updateContact(base, token, id, name) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/update-contact", token, {
                id: id,
                name: name
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    updateMetadata: function updateMetadata(base, token, id, value) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/update-metadata", token, {
                id: id,
                value: value
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    validateAccount: function validateAccount(base, account, type) {
        return new Promise(function (resolve, reject) {
            (0, _request.api)(base + "/validate-account", null, {
                account: account,
                type: type
            }).then(function (response) {
                var code = response.code,
                    payload = response.payload;


                switch (code) {
                    case "success":
                        resolve(payload);

                        break;
                    default:
                        reject(response);
                }
            }).catch(reject);
        });
    },
    http: {
        sayHello: function sayHello(base) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/", null, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        }
    },
    blacklist: {
        log: {
            collectEvents: function collectEvents(base, token, from, to, limit) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/blacklist/log/collect-events", token, {
                        from: from,
                        to: to,
                        limit: limit
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        }
    },
    country: {
        collectPhotos: function collectPhotos(base, country) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/country/collect-photos", null, {
                    country: country
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        deletePhoto: function deletePhoto(base, token, id) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/country/delete-photo", token, {
                    id: id
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        pickPhoto: function pickPhoto(base, country) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/country/pick-photo", null, {
                    country: country
                }, {
                    get: _ui.Platform.store.get,
                    set: _ui.Platform.store.set,
                    expiry: '1 day'
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        uploadPhoto: function uploadPhoto(base, token, country, data) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/country/upload-photo", token, {
                    country: country,
                    data: data
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        }
    },
    promotion: {
        updateTitle: function updateTitle(base, id, title) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/promotion/update-title", null, {
                    id: id,
                    title: title
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        }
    },
    reseller: {
        addAgent: function addAgent(base, token, name) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/add-agent", token, {
                    name: name
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectAgentsAsAdmin: function collectAgentsAsAdmin(base, token) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-agents-as-admin", token, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectAgentsAsReseller: function collectAgentsAsReseller(base, token) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-agents-as-reseller", token, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectProviders: function collectProviders(base, token) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-providers", token, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectTopupsAsAdmin: function collectTopupsAsAdmin(base, token, from, to, agents) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-topups-as-admin", token, {
                    from: from,
                    to: to,
                    agents: agents
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectTopupsAsReseller: function collectTopupsAsReseller(base, token, from, to, agents) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-topups-as-reseller", token, {
                    from: from,
                    to: to,
                    agents: agents
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectTransactionsAsAdmin: function collectTransactionsAsAdmin(base, token, user, from, to, limit) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-transactions-as-admin", token, {
                    user: user,
                    from: from,
                    to: to,
                    limit: limit
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectTransactionsAsReseller: function collectTransactionsAsReseller(base, token, from, to, limit) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-transactions-as-reseller", token, {
                    from: from,
                    to: to,
                    limit: limit
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        collectUsers: function collectUsers(base, token) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/collect-users", token, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        deleteAgent: function deleteAgent(base, token, id) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/delete-agent", token, {
                    id: id
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        executeTransaction: function executeTransaction(base, token, user, amount, reference) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/execute-transaction", token, {
                    user: user,
                    amount: amount,
                    reference: reference
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        pickUserAsAdmin: function pickUserAsAdmin(base, token, user) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/pick-user-as-admin", token, {
                    user: user
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        pickUserAsReseller: function pickUserAsReseller(base, token) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/pick-user-as-reseller", token, {}).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        sendTopup: function sendTopup(base, token, agent, country, account, product, amount) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/send-topup", token, {
                    agent: agent,
                    country: country,
                    account: account,
                    product: product,
                    amount: amount
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        addProvider: function addProvider(base, token, id, user, discount) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/reseller/user/add-provider", token, {
                    id: id,
                    user: user,
                    discount: discount
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        updateAgent: function updateAgent(base, token, id, name) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/update-agent", token, {
                    id: id,
                    name: name
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        }
    },
    topup: {
        generateReceipt: function generateReceipt(base, token, topup) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/topup/generate-receipt", token, {
                    topup: topup
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        }
    },
    userland: {
        blacklist: {
            banUser: function banUser(base, token, user) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/blacklist/ban-user", token, {
                        user: user
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUserAsOperator: function pickUserAsOperator(base, token, id) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/blacklist/pick-user-as-operator", token, {
                        id: id
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        },
        completeAuthentication: function completeAuthentication(base, referral, session, country, prefix, number, code) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/userland/complete-authentication", null, {
                    referral: referral,
                    session: session,
                    country: country,
                    prefix: prefix,
                    number: number,
                    code: code
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        log: {
            collectEvents: function collectEvents(base, token, user) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/log/collect-events", token, {
                        user: user
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        },
        phone: {
            collectUsers: function collectUsers(base, token, ids) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/phone/collect-users", token, {
                        ids: ids
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUserAsClient: function pickUserAsClient(base, token) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/phone/pick-user-as-client", token, {}).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUserAsOperator: function pickUserAsOperator(base, token, id) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/phone/pick-user-as-operator", token, {
                        id: id
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        },
        processResellerAuthentication: function processResellerAuthentication(base, country, prefix, number, password) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/userland/process-reseller-authentication", null, {
                    country: country,
                    prefix: prefix,
                    number: number,
                    password: password
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        push: {
            assignUser: function assignUser(base, token, push) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/push/assign-user", token, {
                        push: push
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        },
        referral: {
            addUser: function addUser(base, token) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/referral/add-user", token, {}).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            computeReferrals: function computeReferrals(base, token, from, to, group) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/referral/compute-referrals", token, {
                        from: from,
                        to: to,
                        group: group
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            computeTopups: function computeTopups(base, token, from, to, group) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/referral/compute-topups", token, {
                        from: from,
                        to: to,
                        group: group
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUser: function pickUser(base, token) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/referral/pick-user", token, {}).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            user: {
                addReferral: function addReferral(base, token, code) {
                    return new Promise(function (resolve, reject) {
                        (0, _request.api)(base + "/userland/referral/user/add-referral", token, {
                            code: code
                        }).then(function (response) {
                            var code = response.code,
                                payload = response.payload;


                            switch (code) {
                                case "success":
                                    resolve(payload);

                                    break;
                                default:
                                    reject(response);
                            }
                        }).catch(reject);
                    });
                }
            }
        },
        registration: {
            computeUsers: function computeUsers(base, token, from, to, group) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/registration/compute-users", token, {
                        from: from,
                        to: to,
                        group: group
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUserAsOperator: function pickUserAsOperator(base, token, id) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/registration/pick-user-as-operator", token, {
                        id: id
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        },
        startAuthentication: function startAuthentication(base, prefix, number) {
            return new Promise(function (resolve, reject) {
                (0, _request.api)(base + "/userland/start-authentication", null, {
                    prefix: prefix,
                    number: number
                }).then(function (response) {
                    var code = response.code,
                        payload = response.payload;


                    switch (code) {
                        case "success":
                            resolve(payload);

                            break;
                        default:
                            reject(response);
                    }
                }).catch(reject);
            });
        },
        stripe: {
            card: {
                collectErrors: function collectErrors(base, token, user, from, to) {
                    return new Promise(function (resolve, reject) {
                        (0, _request.api)(base + "/userland/stripe/card/collect-errors", token, {
                            user: user,
                            from: from,
                            to: to
                        }).then(function (response) {
                            var code = response.code,
                                payload = response.payload;


                            switch (code) {
                                case "success":
                                    resolve(payload);

                                    break;
                                default:
                                    reject(response);
                            }
                        }).catch(reject);
                    });
                }
            },
            collectCardsAsClient: function collectCardsAsClient(base, token) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/stripe/collect-cards-as-client", token, {}).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            collectCardsAsOperator: function collectCardsAsOperator(base, token, user) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/stripe/collect-cards-as-operator", token, {
                        user: user
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            deleteCard: function deleteCard(base, token, id) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/stripe/delete-card", token, {
                        id: id
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            pickUserAsOperator: function pickUserAsOperator(base, token, user) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/stripe/pick-user-as-operator", token, {
                        user: user
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            },
            setupCard: function setupCard(base, token, number, name, month, year, cvc, zip, save) {
                return new Promise(function (resolve, reject) {
                    (0, _request.api)(base + "/userland/stripe/setup-card", token, {
                        number: number,
                        name: name,
                        month: month,
                        year: year,
                        cvc: cvc,
                        zip: zip,
                        save: save
                    }).then(function (response) {
                        var code = response.code,
                            payload = response.payload;


                        switch (code) {
                            case "success":
                                resolve(payload);

                                break;
                            default:
                                reject(response);
                        }
                    }).catch(reject);
                });
            }
        }
    }
};