import '@/app.less'
import { useState } from 'react'
import bg from "@/assets/images/bg.png";
const App = () => {
  const [ count, setCounts ] = useState('')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return (
    <div>
      <h1>Hello React</h1>
      <img src={bg} alt="" />
      <p>受控组件{ count }</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        <p>非受控组件</p>
        <input type="text" />
    </div>
  );
}

export default App;