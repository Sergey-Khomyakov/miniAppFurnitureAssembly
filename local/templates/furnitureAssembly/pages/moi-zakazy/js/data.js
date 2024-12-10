const Orders = [
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12344",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-10",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 2,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП25323",
        status: "Interrupted",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: "Текст",
            photo: [],
            files: [],
            services:[]
        },
        date: "2024-12-06",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 3,
        user: {
            id: 2,
            name: "Иван Иванов",
        },
        name: "СП52244",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: "Текст",
            photo: [],
            files: [],
            services:[]
        },
        date: "2024-12-06",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 3,
        user: {
            id: 2,
            name: "Иван Иванов",
        },
        name: "СП33344",
        status: "Completed",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: "Текст",
            photo: [],
            files: [],
            services:[]
        },
        date: "2024-12-06",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-03",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-05",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-05",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-15",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-20",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-20",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-25",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-25",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12241",
        status: "StartedWork",
        client: {
            name: "Иван Иванов",
            phone: "+7 999 999-99-99",
            adress: "г. Москва, ул. Пушкина, д. 1",
            coordinates: {
                latitude: "55.9742",
                longitude: "37.4861",
            },
        },
        details: {
            typeOrder: "Стандарт",
            workInterval: "22.11.2024 - 25.11.2024",
            dopInfo: null,
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/other/stub.png",
                    name: "фото",
                }
            ],
            files: [
                {
                    id: 1,
                    src: "https://195.58.36.31/upload/uf/351/vdgi3qn1akraklai6jpbviokboh36hvg.docx",
                    name: "Документ (3).docx",
                },
            ],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 2",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
                {
                    id: 1,
                    name: "Услуга 3",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        },
        date: "2024-12-28",
        history: [
            {
                id: 1,
                date: "2024-12-06",
                event: "Поступил заказ",
                author: "Ямпольский А.И.",
            }
        ]
    },
]