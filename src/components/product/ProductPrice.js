import React from 'react'
import { Badge, Typography } from '@material-ui/core'

export default function ProductPrice({ priceRegular, priceFinal }) {
    const isSale = priceRegular != priceFinal

    if (isSale) {
        return (
            <>
                <Typography style={{ fontSize: 14, color: '#c5c5c5', textDecoration: 'line-through' }} >${priceRegular}</Typography>
                <Badge color="secondary" badgeContent="sale">
                    <Typography style={{ fontWeight: "bold" }}>${priceFinal}</Typography>
                </Badge>
            </>
        )
    }

    return (<Typography style={{ fontWeight: "bold" }}>${priceFinal}</Typography>)
}