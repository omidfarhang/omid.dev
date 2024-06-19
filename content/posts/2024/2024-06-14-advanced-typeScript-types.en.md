---
title: 'Deep Dive into Advanced TypeScript: Conditional Types, Mapped Types, and Recursive Types'
date: 2024-06-14T16:21:04+03:30
layout: single
author_profile: true
url: 2024/06/14/advanced-typeScript-types/
shortlink: https://g.omid.dev/ZVEdZo5
tags:
  - TypeScript
  - Types
  - Mapped Types
  - Recursive Types
  - Conditional Types
  - Developers
lang: en
categories: 
  - techblog
---
TypeScript has transformed the way we write JavaScript by providing a static type system that helps developers catch errors early and write more robust code. While basic types and interfaces cover a significant portion of everyday use cases, TypeScript offers advanced features that can take your code to the next level of type safety and flexibility. In this post, we will dive deep into three advanced TypeScript features: Conditional Types, Mapped Types, and Recursive Types. These features are indispensable for creating highly adaptable and type-safe codebases.

## Conditional Types

Conditional types in TypeScript allow you to express types that depend on a condition, similar to ternary operations in JavaScript. This feature is particularly useful for type transformations and ensuring type correctness in complex scenarios.

### Syntax and Basic Usage

The basic syntax of a conditional type looks like this:

```typescript
type TypeName<T> = T extends Condition ? TrueType : FalseType;
```

Here's a simple example:

```typescript
type IsString<T> = T extends string ? 'Yes' : 'No';

type A = IsString<string>;  // 'Yes'
type B = IsString<number>;  // 'No'
```

In this example, `IsString` checks whether the type `T` extends `string`. If `T` is a string, the type resolves to 'Yes'; otherwise, it resolves to 'No'.

### Practical Use Case: Conditional Return Types

Conditional types shine when used with generics to define return types based on input types. This approach ensures that your functions remain type-safe across various use cases.

```typescript
function processValue<T>(value: T): T extends string ? string[] : T[] {
  if (typeof value === 'string') {
    return value.split('') as any;
  } else {
    return [value] as any;
  }
}

const stringResult = processValue("hello");  // string[]
const numberResult = processValue(42);       // number[]
```

In this example, `processValue` utilizes a conditional type to determine its return type. If the input is a string, it returns an array of characters. For any other type, it returns an array containing the input value. This approach ensures that the function remains flexible while providing accurate type information.

### Advanced Example: Type Guards

TypeScript's conditional types can be used in conjunction with type guards to create more sophisticated type checks:

```typescript
type TypeName<T> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends boolean
  ? 'boolean'
  : T extends undefined
  ? 'undefined'
  : T extends Function
  ? 'function'
  : 'object';

function getTypeName<T>(value: T): TypeName<T> {
  if (typeof value === 'string') return 'string' as TypeName<T>;
  if (typeof value === 'number') return 'number' as TypeName<T>;
  if (typeof value === 'boolean') return 'boolean' as TypeName<T>;
  if (typeof value === 'undefined') return 'undefined' as TypeName<T>;
  if (typeof value === 'function') return 'function' as TypeName<T>;
  return 'object' as TypeName<T>;
}

const strType = getTypeName("hello");  // 'string'
const numType = getTypeName(42);       // 'number'
```

This example shows how conditional types can be used to create a `TypeName` type that discriminates between different primitive types and functions.

## Mapped Types

Mapped types allow you to create new types by transforming properties of an existing type. They are essential for generating variations of types without duplicating code, thereby enhancing maintainability and readability.

### Basic Syntax and Example

A mapped type uses the following syntax:

```typescript
type MappedType<T> = {
  [P in keyof T]: Transformation;
};
```

Here's a simple example of a mapped type that makes all properties of a type `T` read-only:

```typescript
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  id: number;
  name: string;
  age: number;
}

type ReadOnlyUser = ReadOnly<User>;
```

In this example, `ReadOnly` is a mapped type that takes a type `T` and makes all its properties read-only. The `keyof` operator is used to get all the keys of `T`, and `[P in keyof T]` iterates over each key to create the new type.

### Practical Use Case: Making Properties Optional

Mapped types can also be used to make all properties of a type optional. This is particularly useful when dealing with API responses where not all fields are guaranteed to be present.

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

type OptionalApiResponse = Optional<ApiResponse>;
```

In this case, `Optional` is a mapped type that makes all properties of `ApiResponse` optional. This is useful when handling partial updates or optional parameters.

### Advanced Example: Mutable Types

Consider a scenario where you have a type with read-only properties and you want to create a mutable version of it:

```typescript
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type MutableUser = Mutable<ReadOnlyUser>;
```

Here, `Mutable` is a mapped type that removes the `readonly` modifier from all properties of a type `T`. The `-readonly` syntax is used to remove the modifier.

## Recursive Types

Recursive types are types that refer to themselves. They are crucial for representing nested structures such as trees or JSON objects.

### Basic Syntax and Example

A recursive type looks like this:

```typescript
type RecursiveType = Type | RecursiveType[];
```

Here's a simple example:

```typescript
type NestedArray<T> = T | NestedArray<T>[];

const example: NestedArray<number> = [1, [2, [3, 4]], 5];
```

In this example, `NestedArray` is a recursive type that can be either a type `T` or an array of `NestedArray<T>`. This allows for deeply nested arrays of numbers.

### Practical Use Case: JSON Structures

Recursive types are particularly useful for representing JSON structures, which can have nested objects and arrays:

```typescript
type JsonValue = string | number | boolean | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
interface JsonArray extends Array<JsonValue> {}

const exampleJson: JsonObject = {
  name: "John",
  age: 30,
  isAdmin: true,
  courses: ["TypeScript", "JavaScript"],
  address: {
    city: "New York",
    zip: 10001
  }
};
```

In this example, `JsonValue` is a recursive type that can be a primitive value, an object, or an array. `JsonObject` and `JsonArray` use this type to create a flexible structure for JSON data.

### Advanced Example: Tree Structures

Recursive types can also be used to represent tree structures, which are common in many applications such as DOM manipulation, organizational charts, and more.

```typescript
interface TreeNode {
  value: string;
  children?: TreeNode[];
}

const tree: TreeNode = {
  value: "root",
  children: [
    { value: "child1" },
    { 
      value: "child2",
      children: [
        { value: "grandchild1" },
        { value: "grandchild2" }
      ]
    }
  ]
};
```

In this example, `TreeNode` is a recursive type that has an optional `children` property, which is an array of `TreeNode`. This allows for representing a tree structure with any depth.

## Combining Advanced Types

The real power of TypeScript’s type system is unlocked when you combine these advanced types. For instance, you can create a utility type that deeply makes all properties of an object read-only:

```typescript
type DeepReadonly<T> = T extends any[] ? ReadonlyArray<DeepReadonly<T[number]>> : T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : T;

interface ComplexObject {
  user: {
    id: number;
    info: {
      name: string;
      email: string;
    };
  };
  tags: string[];
}

type ReadOnlyComplexObject = DeepReadonly<ComplexObject>;
```

In this example, `DeepReadonly` is a recursive mapped type that makes all properties of a type `T` read-only, including nested objects and arrays. This is extremely useful for ensuring immutability in complex data structures.

### Further Combination: Conditional and Mapped Types

You can also combine conditional types with mapped types to create even more sophisticated types. For example, you might want to create a type that makes all properties of an object nullable if they are not functions:

```typescript
type NullableNonFunctionProperties<T> = {
  [P in keyof T]: T[P] extends Function ? T[P] : T[P] | null;
};

interface Example {
  id: number;
  name: string;
  callback: () => void;
}

type NullableExample = NullableNonFunctionProperties<Example>;
```

In this example, `NullableNonFunctionProperties` is a mapped type that checks each property of type `T`. If the property is a function, it remains unchanged; otherwise, it becomes nullable. This type transformation can be particularly useful when dealing with optional data in APIs or forms.

## Conclusion

TypeScript's advanced types—conditional types, mapped types, and recursive types—offer a robust toolkit for crafting highly flexible and type-safe code. By understanding and utilizing these features, you can handle complex type scenarios with ease, ensuring that your code is not only correct but also maintainable and scalable.

Whether you're dealing with dynamic API responses, complex data transformations, or deeply nested structures, mastering these advanced types will significantly enhance your TypeScript skills. The examples and use cases provided here are just the beginning. Experiment with these types in your projects, and you'll discover even more ways to leverage TypeScript's powerful type system to create better software.
