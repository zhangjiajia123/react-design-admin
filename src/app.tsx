import '@/app.less'
import { lazy, Suspense, useState } from 'react'
const Lazy = lazy(() => import('@/components/Lazy'))
import bg from "@/assets/images/bg.png";
const App = () => {
  const [ count, setCounts ] = useState('')
  const [ show, setShow ] = useState(false)
  const onChange = (e: any) => {
    setCounts(e.target.value)
    setShow(true)
  }
  return (
    <div>
      <h1>Hello React</h1>
      <img src={bg} alt="" />
      <p>受控组件111{ count }</p>
        <input type="text" value={count} onChange={onChange} />
        <br />
        { show && <Suspense fallback={null}> <Lazy name="我是懒加载组件！" /> </Suspense>}
    </div>
  );
}

export default App;