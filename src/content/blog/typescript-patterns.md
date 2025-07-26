---
title: "Advanced TypeScript Patterns for React Applications"
description: "Explore advanced TypeScript patterns including generics, conditional types, and utility types to build type-safe React applications."
date: "2025-01-10"
author: "Your Name"
tags: ["typescript", "react", "patterns", "generics", "advanced"]
category: "Advanced"
readTime: "8 min read"
featured: true
---

# Advanced TypeScript Patterns for React Applications

TypeScript has revolutionized React development by providing compile-time type safety and excellent developer experience. Let's explore some advanced patterns that will elevate your TypeScript skills.

## 1. Generic React Components

Create reusable components with type safety:

```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  className?: string;
}

function List<T>({ items, renderItem, keyExtractor, className }: ListProps<T>) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={keyExtractor(item)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const UserList = () => {
  const users: User[] = [
    { id: 1, name: "John", email: "contact@nitinrahane.com" },
    { id: 2, name: "Jane", email: "jane@example.com" }
  ];

  return (
    <List
      items={users}
      keyExtractor={(user) => user.id}
      renderItem={(user) => (
        <div className="p-4 border rounded">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
    />
  );
};
```

## 2. Conditional Types for API Responses

Handle different API response shapes with conditional types:

```typescript
type ApiResponse<T, E = string> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

type User = {
  id: number;
  name: string;
  email: string;
};

// Type-safe API hook
function useApi<T, E = string>(
  url: string
): {
  data: T | null;
  error: E | null;
  loading: boolean;
  refetch: () => Promise<void>;
} {
  const [state, setState] = useState<{
    data: T | null;
    error: E | null;
    loading: boolean;
  }>({
    data: null,
    error: null,
    loading: true
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url);
      const result: ApiResponse<T, E> = await response.json();
      
      if (result.success) {
        setState({ data: result.data, error: null, loading: false });
      } else {
        setState({ data: null, error: result.error, loading: false });
      }
    } catch (err) {
      setState({ 
        data: null, 
        error: err as E, 
        loading: false 
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Usage
const UserProfile = ({ userId }: { userId: number }) => {
  const { data: user, error, loading } = useApi<User>(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

## 3. Utility Types for Form Handling

Create type-safe forms with utility types:

```typescript
// Base form types
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
};

type FormState<T> = {
  [K in keyof T]: FormField<T[K]>;
};

// Validation rules
type ValidationRule<T> = (value: T) => string | undefined;

type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>[];
};

// Form hook
function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules<T> = {}
) {
  const [formState, setFormState] = useState<FormState<T>>(() =>
    Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = {
        value: initialValues[key],
        touched: false
      };
      return acc;
    }, {} as FormState<T>)
  );

  const validateField = (name: keyof T, value: T[keyof T]): string | undefined => {
    const rules = validationRules[name];
    if (!rules) return undefined;

    for (const rule of rules) {
      const error = rule(value);
      if (error) return error;
    }
    return undefined;
  };

  const setFieldValue = (name: keyof T, value: T[keyof T]) => {
    setFormState(prev => ({
      ...prev,
      [name]: {
        value,
        error: validateField(name, value),
        touched: true
      }
    }));
  };

  const getValues = (): T => {
    return Object.keys(formState).reduce((acc, key) => {
      acc[key as keyof T] = formState[key as keyof T].value;
      return acc;
    }, {} as T);
  };

  const isValid = Object.values(formState).every(field => !field.error);

  return {
    formState,
    setFieldValue,
    getValues,
    isValid
  };
}

// Usage
interface LoginForm {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const { formState, setFieldValue, getValues, isValid } = useForm<LoginForm>(
    { email: '', password: '' },
    {
      email: [
        (value) => !value ? 'Email is required' : undefined,
        (value) => !/\S+@\S+\.\S+/.test(value) ? 'Invalid email' : undefined
      ],
      password: [
        (value) => !value ? 'Password is required' : undefined,
        (value) => value.length < 6 ? 'Password must be at least 6 characters' : undefined
      ]
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      console.log(getValues());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formState.email.value}
          onChange={(e) => setFieldValue('email', e.target.value)}
          className={`border p-2 rounded ${
            formState.email.error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formState.email.error && (
          <p className="text-red-500 text-sm">{formState.email.error}</p>
        )}
      </div>
      
      <div>
        <input
          type="password"
          placeholder="Password"
          value={formState.password.value}
          onChange={(e) => setFieldValue('password', e.target.value)}
          className={`border p-2 rounded ${
            formState.password.error ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {formState.password.error && (
          <p className="text-red-500 text-sm">{formState.password.error}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={!isValid}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Login
      </button>
    </form>
  );
};
```

## 4. Advanced Component Props with Discriminated Unions

Create flexible component APIs:

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger';

type BaseButtonProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonProps = BaseButtonProps & (
  | {
      variant: 'primary' | 'secondary';
      onClick: () => void;
      href?: never;
    }
  | {
      variant: 'danger';
      onClick: () => void;
      href?: never;
      confirmText: string;
    }
  | {
      variant?: never;
      onClick?: never;
      href: string;
      external?: boolean;
    }
);

const Button: React.FC<ButtonProps> = (props) => {
  if ('href' in props) {
    return (
      <a
        href={props.href}
        className={`inline-block px-4 py-2 rounded ${props.className}`}
        target={props.external ? '_blank' : undefined}
        rel={props.external ? 'noopener noreferrer' : undefined}
      >
        {props.children}
      </a>
    );
  }

  if (props.variant === 'danger') {
    const handleClick = () => {
      if (confirm(props.confirmText)) {
        props.onClick();
      }
    };

    return (
      <button
        onClick={handleClick}
        disabled={props.disabled}
        className={`px-4 py-2 rounded bg-red-500 text-white ${props.className}`}
      >
        {props.children}
      </button>
    );
  }

  const variantStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white'
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`px-4 py-2 rounded ${variantStyles[props.variant]} ${props.className}`}
    >
      {props.children}
    </button>
  );
};

// Usage - all type-safe!
const Examples = () => (
  <div className="space-x-2">
    <Button variant="primary" onClick={() => console.log('Primary')}>
      Primary
    </Button>
    
    <Button 
      variant="danger" 
      onClick={() => console.log('Danger')} 
      confirmText="Are you sure?"
    >
      Delete
    </Button>
    
    <Button href="/about" external>
      External Link
    </Button>
  </div>
);
```

## Key Takeaways

1. **Generics** enable reusable, type-safe components
2. **Conditional types** handle complex API scenarios
3. **Utility types** simplify form and state management
4. **Discriminated unions** create flexible component APIs

These patterns will help you build more maintainable and type-safe React applications. The key is to leverage TypeScript's type system to catch errors at compile time and improve developer experience.

## Further Reading

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
