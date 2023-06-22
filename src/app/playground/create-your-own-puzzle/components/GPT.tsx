import { Transition } from 'react-transition-group';
import { useState, useRef } from 'react';

export default function GPT() {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div>
      <Transition nodeRef={nodeRef} in={inProp} timeout={500}></Transition>
      <button onClick={() => setInProp(true)}>Click to Enter</button>
    </div>
  );
}
