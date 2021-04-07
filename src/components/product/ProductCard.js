import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { StarRounded } from '@material-ui/icons';

import ProductPrice from './ProductPrice';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardContentTitle: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    cardContentRating: {
        fontSize: 18,
        color: '#c5c5c5'
    },
}));

export default function ProductCard({ product, isLoading }) {
    const classes = useStyles();

    const priceRegular = isLoading ? 0 : product.price_range.minimum_price.regular_price.value
    const priceFinal = isLoading ? 0 : product.price_range.minimum_price.final_price.value

    return (
        <Card className={classes.card}>
            {isLoading
                ? <>
                    <Skeleton variant="rect" height={`150px`} />
                </>
                : <CardMedia
                    className={classes.cardMedia}
                    image={product.image.url}
                    title="Image title"
                />}
            <CardContent className={classes.cardContent}>
                {isLoading
                    ? <>
                        <Skeleton variant="text" width={`80%`} />
                        <Skeleton variant="text" width={`60%`} />
                        <Skeleton variant="text" width={`60%`} />
                    </>
                    : <>
                        <Typography className={classes.cardContentTitle} gutterBottom>{product.name}</Typography>
                        <ProductPrice priceFinal={priceFinal} priceRegular={priceRegular} />
                        <Grid container style={{ marginTop: 5 }}>
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                        </Grid>
                    </>}
            </CardContent>
        </Card>
    )
}
