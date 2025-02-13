export { };

class person {
  name: string;
  age: number;

  constructor(name: string, age:number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`하이~ 나는 ${this.name}이고 ${this.age}살이야`);
  }
}

declare global {
  interface String {
    capitalize(): string;
  }

  interface Array<T> {
    sum(): number;
  }
}

String.prototype.capitalize = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.sum = function (): number {
  return this.reduce((acc, cur) => acc + (typeof cur === "number" ? cur : 0), 0);
}