import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from "@apollo/client";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Backdrop from '@material-ui/core/Backdrop';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StarRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const GET_CATEGORY_PRODUCTS = gql`
  query getCategoryProducts($categoryId: Int) {
    category(id: $categoryId){
      id
      name
      url_key
      products{
        items{
          id
          name
          image{
            url
          }
          popular_icon
          rating_summary
          review_count
          url_key
          price_range{
            minimum_price{
              final_price{
                value
              }
              regular_price{
                value
              }
            }
          }
        }
        total_count
      }
    }
  }
`

function TextPrice({ priceRegular, priceFinal }) {
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


const CategoryById = () => {
  const classes = useStyles();
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      categoryId: id
    }
  });

  if (loading) return (
    <Backdrop className={classes.backdrop} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );

  if (error) return (
    <Backdrop className={classes.backdrop} open={error}>
      <Typography variant="h5" align="center" paragraph>
        Oops something when wrong :(
      </Typography>
    </Backdrop>
  );

  const { name: categoryName, products } = data.category
  const { items: productList, total_count: productTotal } = products

  return (
    <>
      <Head>
        <title>Training Nextjs | Category {categoryName}</title>
      </Head>

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Category {categoryName}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Currently available {productTotal} products
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {productList.map((product) => {
              const priceRegular = product.price_range.minimum_price.regular_price.value
              const priceFinal = product.price_range.minimum_price.final_price.value

              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Link href={`/product/${product.url_key}`}>
                    <a style={{ textDecoration: "none" }}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={product.image.url}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography className={classes.cardContentTitle} gutterBottom>{product.name}</Typography>
                          <TextPrice priceFinal={priceFinal} priceRegular={priceRegular} />
                          <Grid container style={{ marginTop: 5 }}>
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                            <StarRounded className={classes.cardContentRating} />
                          </Grid>
                        </CardContent>
                      </Card>
                    </a>
                  </Link>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default CategoryById
