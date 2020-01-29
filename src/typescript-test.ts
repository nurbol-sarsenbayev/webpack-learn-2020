interface Person {
    name: string;
    age: number;
}

const displayName = (person: Person) => {
    const { name, age } = person
    console.log('name', name, 'age', age)
}

displayName({ name: 'Nurbol', age: 27 })
displayName({ name: 'Farabi', age: 25 })

class Card {
    static id: number = Date.now();
}

console.log('Card Id', Card.id)
