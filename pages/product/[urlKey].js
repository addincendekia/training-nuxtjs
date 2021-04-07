import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../lib/apollo/apolloClient";

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    flexGrow: 1,
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const GET_PRODUCT = gql`
  query getProduct($urlKey: String) {
    products(filter: {
      url_key: {
        eq: $urlKey
      }
    }){
      items{
        id
        name
        description {
          html
        }
        image{
          url
        }
        price_range{
          maximum_price{
            final_price{
              value
            }
            regular_price{
              value
            }
          }
        }
        qty_available
        rating_summary
        categories{
          name
        }
      }
    }
  }
`

const ProductDetail = () => {
  const classes = useStyles();
  const router = useRouter()
  const { urlKey } = router.query

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      urlKey
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

  const { items } = data.products
  const product = items[0]

  return (
    <>
      <Head>
        <title>Training Nextjs | Product {product.name}</title>
      </Head>

      <main>
        <div className={classes.root}>
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} sm="6">
                <img src={product.image.url} style={{ width: '100%', height: '100%' }} />
              </Grid>
              <Grid item xs={12} sm="6">
                <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h5" color="textSecondary" paragraph>
                  <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
                </Typography>

                <Button variant="contained" color="primary">Beli Sekarang</Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  )
}

export default withApollo({ ssr: true })(ProductDetail);
