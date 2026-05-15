db = db.getSiblingDB('compdb');
db.computers.drop();

db.computers.insertMany([
    { 
        inv_num: "N-1001", year: 2020, warranty_years: 3, 
        cpu: "Intel Core i5", ram: 8, disk: 256, 
        software: "Office 2021",
        price: "18500 UAH" 
    },
    { 
        inv_num: "N-1002", year: 2024, warranty_years: 3, 
        cpu: "AMD Ryzen 5", 
        software: "Google Chrome",
        gpu: "Radeon Graphics" 
    },
    { 
        inv_num: "N-1003", year: 2019, warranty_years: 2,
        cpu: "Intel Core i3", ram: 4, 
        software: "Windows 10"
    },
    { 
        inv_num: "N-1004", year: 2025, warranty_years: 5, 
        cpu: "Intel Core i7", ram: 32, disk: 1024, 
        software: "Windows 11",
        gpu: "RTX 4060", price: "54000 UAH" 
    },
    { 
        inv_num: "N-1005", year: 2022, warranty_years: 3,
        cpu: "AMD Ryzen 7", disk: 512, 
        software: "Office 2021",
        price: "29000 UAH"
    },
    { 
        inv_num: "N-1006", year: 2023, warranty_years: 1, 
        cpu: "Intel Core i5", ram: 8, 
        software: "Ubuntu"
    },
    { 
        inv_num: "N-1007", year: 2021, warranty_years: 5, 
        cpu: "Intel Core i5", ram: 16, disk: 512, 
        software: "VS Code",
        gpu: "GTX 1650"
    },
    { 
        inv_num: "N-1008", year: 2018, warranty_years: 2,
        cpu: "Intel Core i3", ram: 4, disk: 128, 
        software: "Windows 10",
        price: "12000 UAH"
    },
    { 
        inv_num: "N-1009", year: 2026, warranty_years: 2, 
        cpu: "AMD Ryzen 5", ram: 16, disk: 512, 
        software: "Google Chrome"
    },
    { 
        inv_num: "N-1010", year: 2024, warranty_years: 5, 
        cpu: "Intel Core i7", ram: 16, disk: 1024, 
        software: "VS Code",
        gpu: "NVIDIA T1000", price: "41000 UAH"
    }
]);

