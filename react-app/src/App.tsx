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
