## Using `immer` library to update state logic
```tsx
import { useState } from "react";
import produce from "immer";
import Button from "./components/Button";

function App() {
  const [bugs, setBugs] = useState(
    [
      { id: 1, title: 'Bug 1', fixed: false},
      { id: 2, title: 'Bug 2', fixed: false},
    ]
  );

  const handleClick = () => {
    // setBugs(bugs.map(bug => bug.id === 1 ? {...bug, fixed: true} : bug));
    setBugs(produce(draft => {
      const bug = draft.find( bug => bug.id === 1);
      if(bug) bug.fixed = true;
    }))
  };

  return (
    <div>
      {bugs.map(bug => <p key={bug.id}>{bug.title} {bug.fixed ? 'Fixed': 'New'}</p>)}
      <Button onClick={handleClick}>Click Me</Button>
    </div>
  );
}

export default App;
 
```

```tsx
import { useState } from "react";
// import { produce } from 'immer';

function App() {
  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 1 },
    ],
  });

  const handleClick = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };

  return (
    <div>
      <ul>
        {cart.items.map((item) => (
          <li>
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;

// without using immer

// Method 1
// const handleClick = () => {
//   setCart((prevCart) => ({
//     ...prevCart,
//     items: prevCart.items.map((item) =>
//       item.id === 1 ? { ...item, quantity: 2 } : item
//     ),
//   }));
// };

// Method 2

// using immer
// const handleClick = () => {
//   setCart(
//     produce(draft => {
//       const item = draft.items.find(item => item.id === 1);
//       if(item) item.quantity=2;
//     } )
//   );
// };

```


### Creating an expandable component

This is the `expandable.tsx` code

```tsx
interface Props {
  children: string;
  textLength: 100 | 20 | "auto";
  expandText: () => void;
  minimizeText: () => void;
  btnText: string;
}

const ExpandableText = ({
  children,
  textLength,
  expandText,
  minimizeText,
  btnText,
}: Props) => {
  const displayedText =
    textLength === "auto" ? children : children.substring(0, textLength);
  return (
    <div>
      <p>{displayedText}</p>
      {textLength === "auto" ? (
        <button onClick={minimizeText}>Less</button>
      ) : (
        <button onClick={expandText}>{btnText}</button>
      )}
    </div>
  );
};

export default ExpandableText;

```

This is the `app.tsx` code

```tsx
import { useState } from "react";
import ExpandableText from "./components/ExpandableText";

function App() {
  // state of text
  const [textLength, setTextLength] = useState<100 | 20 | "auto">(100);

  // state of button
  const [btnText, setBtnText] = useState("More");

  // function to expand the text
  const expandText = () => {
    if (textLength === 100) {
      setTextLength("auto");
      setBtnText("Less");
    } else if (textLength === 20) {
      setTextLength("auto");
      setBtnText("Less");
    }
  };

  // function to minimize the text
  const minimizeText = () => {
    setTextLength(20);
    setBtnText("More");
  };

  return (
    <div>
      <ExpandableText
        textLength={textLength}
        expandText={expandText}
        minimizeText={minimizeText}
        btnText={btnText}
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis enim
        culpa amet. Est adipisci voluptatum quas nostrum aliquid architecto
        minus, cupiditate quibusdam placeat vitae libero et dicta asperiores.
        Dolorem nulla eligendi distinctio repudiandae ipsam rem iste
        perspiciatis fuga fugiat illum incidunt, asperiores placeat ullam sunt
        voluptates doloremque ut? Ipsa odit eos assumenda sunt enim,
        consequuntur repudiandae architecto ipsam eligendi nobis quas eaque
        iure, reiciendis dolorum voluptate deserunt, ut doloremque quis hic
        necessitatibus pariatur perspiciatis odio dolores! Quasi aspernatur
        dignissimos laborum tenetur. Quos ea assumenda voluptates eligendi!
        Accusantium hic pariatur esse quis quaerat, incidunt rerum ut tempore
        ipsum obcaecati ipsam facilis id vel perferendis optio odit a deserunt
        dolores similique. Inventore obcaecati tenetur magni porro praesentium
        ab eos laudantium iure soluta vel, blanditiis aliquid nam autem quas,
        fuga fugiat velit perferendis sint ipsum laborum quod qui maxime non
        accusamus. Asperiores possimus dolor aliquid? Voluptatum doloremque
        dolore, hic quis, voluptatem culpa magni delectus quos voluptatibus ipsa
        laborum non harum deleniti ut iusto nulla sed neque quod voluptas ullam
        nam autem illum minima cumque. Totam corporis fugit nulla voluptatem
        harum blanditiis obcaecati esse veritatis quis, libero magni officiis
        consectetur, repellat possimus? Id quia similique modi mollitia deleniti
        a odit magni exercitationem assumenda excepturi.
      </ExpandableText>
    </div>
  );
}

export default App;

```


#### Method provided

```tsx
import { useState } from "react";

interface Props {
  children: string;
  maxChars: number;
}

const ExpandableText = ({children, maxChars = 100}: Props) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  }

  if(children.length <= maxChars) return <p>{children}</p>;

  const txt = isExpanded ? children : children.substring(0, maxChars);
  return <p>{txt}...<button onClick={handleClick}>{isExpanded ? 'Less' : 'More'}</button></p>;
}

export default ExpandableText
```

```tsx
//import { useState } from "react";
import ExpandableText from "./components/ExpandableText";

function App() {
  return (
    <div>
      <ExpandableText maxChars={30}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, obcaecati
        nihil dolorum odio, ipsum accusantium voluptas officia ipsam nulla
        similique magni ducimus architecto? Ad ipsam recusandae inventore
        deserunt maiores qui?
      </ExpandableText>
    </div>
  );
}

export default App;

```


### Forms

Getting values of input field using useRef() hook

```tsx
import { FormEvent, useRef } from "react";

const Form = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const ageRef  = useRef<HTMLInputElement>(null);
    const person = { name: '', age: 0 }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (nameRef.current !== null)
            person.name = nameRef.current.value;
        if (ageRef.current !==null)
            person.age = parseInt(ageRef.current.value);
        console.log(person);
    }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" ref={nameRef} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input id="age" ref={ageRef} type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">Submit</button>
    </form>
  );
};

export default Form;
```

Using state hook to get input values

```tsx
import { FormEvent, useState } from "react";

const Form = () => {
  const [person, setPerson] = useState({
    name: "",
    age: "",
  });
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(person);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          id="name"
          // makes input value be controlled entirely by the state and not managed by the DOM
          value={person.name}
          onChange={(event) =>
            setPerson({ ...person, name: event.target.value })
          }
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input 
          id="age"
          value={person.age}
          onChange={(event) => setPerson({...person, age: parseInt(event.target.value)})} 
          type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;

```

Using the react hook form library

```tsx
import { FieldValues, useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          {...register("age")}
          id="age"
          type="number"
          className="form-control"
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;

```
