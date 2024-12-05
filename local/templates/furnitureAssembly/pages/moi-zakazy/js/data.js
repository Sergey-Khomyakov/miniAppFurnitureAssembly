const Orders = [
    {
        id: 1,
        user: {
            id: 1,
            name: "Иван Иванов",
        },
        name: "СП12344",
        status: "New",
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
            files: [],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        }
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
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                }
            ],
            files: [],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        }
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
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                }
            ],
            files: [],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        }
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
            photo: [
                {
                    id: 1,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                },
                {
                    id: 2,
                    src: "./local/templates/furnitureAssembly/img/",
                    name: "фото",
                }
            ],
            files: [],
            services:[
                {
                    id: 1,
                    name: "Услуга 1",
                    count: "1",
                    unitMeasurement: "шт.",
                    prise: "100",
                },
            ]
        }
    },
]