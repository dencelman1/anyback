import './App.scss'
import { useState } from 'react'



var adminSections = [
  { name: "Database", },
  { name: "Analytics", },
]



function AnyBackAdminPanel({
  options,
}) {
  
  var [current, setCurrent] = useState({
    section: '',
  })
  var [opened, setOpened] = useState({
    sections: true,
  })

  return (
    <div
      style={{
        width:
          current.section === "" ? "100%": opened.sections
      }}
    >
      {
        adminSections.map((section, i) => {
          return (
            <div
              key={i}
              onClick={() => setCurrent(p => ({...p, section: section.name}))}
              

            >
              {section.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default AnyBackAdminPanel
