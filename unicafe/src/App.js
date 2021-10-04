import React, { useState } from 'react'

const Button = ( {handler, text} ) => {
  return (
    <>
      <button onClick={handler}>{text}</button>
    </>
  )
}

const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <td>{text} {value}</td>
    </tr>
  )
}

const Statistics = ( {good, neutral, bad}) => {
  let all = good+bad+neutral
  let avg = (good-bad)/all
  let percentPos = 100*(good/all)

  if (all===0){
    return (
      <>
        <h1>statistics</h1>
        no feedback given
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good}/>
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={avg} />
          <StatisticLine text={"positive"} value={percentPos + " %"} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handler={()=>setGood(good+1)} />
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <br/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
