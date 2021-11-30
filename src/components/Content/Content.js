import React from 'react'
import NavMenu from '../NavMenu/NavMenu'
import Tabs from '../Tabs/Tabs'
import '../Content/Content.css'
export default function Content() {
    return (
        <div id="content">
            <NavMenu/>
            <Tabs/>
        </div>
    )
}
