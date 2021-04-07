import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../lib/apollo/apolloClient";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductCard from '../../src/components/product/ProductCard';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
const CategoryById = () => {
  const classes = useStyles();
  const router = useRouter()
  const { id } = router.query

  const { loading, error, data } = useQuery(GET_CATEGORY_PRODUCTS, {
    variables: {
      categoryId: id
    }
  });
  // const error = false;
  // const loading = true;

  let categoryName = '';
  let productList = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];
  let productTotal = 0;

  if (error) return (
    <Backdrop className={classes.backdrop} open={error}>
      <Typography variant="h5" align="center" paragraph>
        Oops something when wrong :(
      </Typography>
    </Backdrop>
  );

  if (!loading) {
    categoryName = data.category.name
    productList = [...data.category.products.items]
    productTotal = data.category.products.total_count
  }

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
              return (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Link href={loading ? `#` : `/product/${product.url_key}`}>
                    <a style={{ textDecoration: "none" }}>
                      <ProductCard product={product} isLoading={loading} />
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

export default withApollo({ ssr: true })(CategoryById);
