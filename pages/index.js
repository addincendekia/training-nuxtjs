import Head from 'next/head'
import Link from 'next/link'
import { withApollo } from "../lib/apollo/apolloClient";
import { gql, useQuery } from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';


import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { StarRounded } from '@material-ui/icons';
import CategoryCard from '../src/components/category/CategoryCard';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const GET_CATEGORIES = gql`
  query getCategories{
    categories{
      items{
        id
        name
        description
        children{
          id
          name
          description
          url_key
          products{
            total_count
          }
          include_in_menu
          popular_icon
        }
      }
      total_count
    }
  }
`

function Home() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  // const error = false;
  // const loading = true;

  let items = [];
  let categories = [
    { include_in_menu: 1, id: 1 },
    { include_in_menu: 1, id: 2 },
    { include_in_menu: 1, id: 3 },
  ];
  let totalCount = 0;

  if (error) return (
    <Backdrop className={classes.backdrop} open={error}>
      <Typography variant="h5" align="center" color="white" paragraph>
        Oops something when wrong :(
      </Typography>
    </Backdrop>
  );

  if (!loading) {
    items = data.categories.items
    totalCount = data.categories.total_count

    items.forEach((groupCategory) => {
      categories = [...groupCategory.children]
    })
  }

  return (
    <>
      <Head>
        <title>Training Nextjs | Product Categories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Product Categories
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Currently available {totalCount} product categories
            </Typography>
          </Container>
        </div>
        {/* End hero unit */}

        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {categories.map((category) => {
              if (!category.include_in_menu) return

              return (
                <Grid item xs={12} sm={6} md={4} key={category.id}>
                  <Link href={loading ? `#` : `/category/${category.id}`}>
                    <a style={{ textDecoration: "none" }}>
                      <CategoryCard category={category} isLoading={loading} />
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

export default withApollo({ ssr: true })(Home);
