import React from 'react'

const Header = ({ course }) => (
  <div>
    <h1>{course}</h1>
  </div>
)

const Part = ( {part, exercises}) => (
  <>
    <p>
      {part} {exercises}
    </p>
  </>
)
const Content = (props) => (
  <div>
    {props.parts.map(part=> <Part part={part.name} exercises={part.exercises} key={part.id}/>)}
  </div>
)

const Total = (props) => {

  const total = (props.parts.map(a=>a.exercises)).reduce((p, c) => p+c)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ( {course} ) => {
  return (<div>
      <Header course = {course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
  </div>
  )
}

export default Course