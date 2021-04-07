import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { StarRounded } from '@material-ui/icons';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: "relative"
    },
    cardBadge: {
        position: "absolute",
        top: "10px",
        right: "10px",
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        textAlign: "center"
    },
}));

export default function CategoryCard({ category, isLoading }) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            {!isLoading ?? <Chip className={classes.cardBadge} label="popular" icon={<StarRounded />} color="secondary" />}
            {isLoading
                ? <>
                    <Skeleton variant="rect" height={`150px`} />
                </>
                : <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title={`image ${category.name} category`}
                />}
            <CardContent className={classes.cardContent}>
                {isLoading
                    ? <>
                        <Skeleton variant="text" width={`70%`} style={{ margin: "auto" }} />
                        <Skeleton variant="text" width={`50%`} style={{ margin: "auto" }} />
                    </>
                    : <>
                        <Typography variant="h6" style={{ fontWeight: "bold" }}>{category.name}</Typography>
                        <Typography>{category.products.total_count} products</Typography>
                    </>}
            </CardContent>
        </Card>
    )
}
