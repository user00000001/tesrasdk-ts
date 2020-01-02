export default {
    hash: 'ff00000000000000000000000000000000000003',
    entrypoint: 'Main',
    functions: [
        {
            name: 'Main',
            parameters: [
                {
                    name: 'operation',
                    type: 'String'
                },
                {
                    name: 'args',
                    type: 'Array'
                }
            ],
            returntype: 'Any'
        },
        {
            name: 'regIDWithPublicKey',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'regIDWithAttributes',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                },
                {
                    name: 'tuples',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'addKey',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'newPublicKey',
                    type: 'ByteArray'
                },
                {
                    name: 'sender',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'removeKey',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'oldPublicKey',
                    type: 'ByteArray'
                },
                {
                    name: 'sender',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'addRecovery',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'recovery',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'changeRecovery',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'newRecovery',
                    type: 'ByteArray'
                },
                {
                    name: 'recovery',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'addAttributes',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'attributes',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'removeAttribute',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'path',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Boolean'
        },
        {
            name: 'getPublicKeys',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                }
            ],
            returntype: 'ByteArray'
        },
        {
            name: 'getAttributes',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                }
            ],
            returntype: 'ByteArray'
        },
        {
            name: 'GetPublicKeyId',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'ByteArray'
        },
        {
            name: 'getKeyState',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'pkId',
                    type: 'Int'
                }
            ],
            returntype: 'ByteArray'
        },
        {
            name: 'GetRecovery',
            parameters: [
                {
                    name: 'tstId',
                    type: 'ByteArray'
                }
            ],
            returntype: 'ByteArray'
        },
        {
            name: 'getDDO',
            parameters: [
                {
                    name: 'id',
                    type: 'ByteArray'
                }
            ],
            returntype: 'ByteArray'
        }
    ],
    events: [
        {
            name: 'Register',
            parameters: [
                {
                    name: 'op',
                    type: 'String'
                },
                {
                    name: 'tstId',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Void'
        },
        {
            name: 'PublicKey',
            parameters: [
                {
                    name: 'op',
                    type: 'String'
                },
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'publicKey',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Void'
        },
        {
            name: 'Attribute',
            parameters: [
                {
                    name: 'op',
                    type: 'String'
                },
                {
                    name: 'tstId',
                    type: 'ByteArray'
                },
                {
                    name: 'attrName',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Void'
        },
        {
            name: 'Debug',
            parameters: [
                {
                    name: 'func',
                    type: 'String'
                },
                {
                    name: 'info',
                    type: 'ByteArray'
                }
            ],
            returntype: 'Void'
        },
        {
            name: 'Debug',
            parameters: [
                {
                    name: 'func',
                    type: 'String'
                },
                {
                    name: 'trace',
                    type: 'Integer'
                }
            ],
            returntype: 'Void'
        }
    ]
};
