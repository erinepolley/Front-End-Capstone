import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { textAlign } from '@material-ui/system';


//Using material UI on this page for cards.

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    }
});

export default function RackCard(props) {
    // console.log("PROPS", props)
    const classes = useStyles();
    return (
        <>
        <div className="cards">
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.img}
                        component="img"
                        alt="Bicycle Image"
                        height="200"
                        src={`${props.rack.imageUrl}`}
                        title="Bike Rack"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Rack Location: {props.rack.establishmentName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Type: {props.rack.establishmentType.establishmentType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Address: {props.rack.address}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Capacity: {props.rack.capacity} bikes
                                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Comments: {props.rack.comments}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
            <CardActions>
                <Link to={`/edit/${props.rack.id}`}><button>Edit</button></Link>
                <button type="button" onClick={() => {props.deleteThisRack(props.rack.id)}}>Delete</button>
            </CardActions>
        </Card>
        </div>
            </>
        )
}




//     <Button size="small" color="primary">
//     Share
// </Button>
// <Button size="small" color="primary">
//     Learn More
// </Button>
