import React from 'react'

function BocureList (props) {
    return props.bocureList.map((item)=>{
        return(
            <div
                key={item.key}
                >
                        <h3>{`Activity: ${item.activity}`}</h3>
                        <h3>{`Type: ${item.type}`}</h3>
                        <h3>{`Price: ${item.price}`}</h3>
                        <h3>{`Accessibility: ${item.accessibility}`}</h3>
                        <h3>{`Participants: ${item.participants}`}</h3>
                        {item.link && (
                            <h3>{`Link: ${item.link}`}</h3>
                        )}
            </div>
        )
    })
}

export default BocureList
