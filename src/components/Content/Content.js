import React from 'react'
import Tabs from '../Tabs/Tabs'
import '../Content/Content.css'
import Draggable from 'react-draggable'

export default function Content() {
    return (
        <div id="content">
            <Draggable>
                <div id = "drag">                    
                     <Tabs TabName="1"/> 
                </div>               
            </Draggable>
        </div>
    )
}
