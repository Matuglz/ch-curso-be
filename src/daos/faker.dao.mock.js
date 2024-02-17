import { faker } from "@faker-js/faker"

class fakerDaoMock {
    createMockProducts(quantity) {
        try {
            const products = []
            for (let i = 0; i < quantity; i++) {
                products.push({
                    _id: faker.string.uuid(),
                    title: faker.commerce.productName(),
                    description: faker.commerce.productDescription(),
                    price: faker.commerce.price(),
                    code: faker.location.zipCode(),
                    stock: Math.floor(Math.random() * 100),
                    status: true
                })
            }
            return products
        }
        catch {
            throw new Error('error al crear los productos con faker')
        }
    }
}

export function getFakerDao(){
    let fakerDao
    return fakerDao = new fakerDaoMock
}