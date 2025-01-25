import React, { useContext } from 'react'
import { PanelControlContext } from '../../../context/PanelControlContext'

const ConfigControlPage: React.FC = () => {
  const {InstagramLogin} = useContext(PanelControlContext)!

   
  return (
    <div>
      <button className='px-3 py-2 bg-orange-400' onClick={InstagramLogin}>
        Instagram
      </button>
    </div>
  )
}

export default ConfigControlPage
