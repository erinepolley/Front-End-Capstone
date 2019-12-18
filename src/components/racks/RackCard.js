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
import './RackForms.css'
import '../App.css'

//Using material UI on this page for cards.

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },

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
                    <CardContent className='reg-test'>
                        <h1>{props.rack.establishmentName}</h1>
                        {/* <Typography gutterBottom variant="h5" component="h2">
                           {props.rack.establishmentName}
                        </Typography> */}
                        <Typography variant="body2" color="textSecondary" component="p">
                            <strong>Type:</strong> {props.rack.establishmentType.establishmentType}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Address:</strong> {props.rack.address}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Capacity:</strong> {props.rack.capacity} bikes
                                </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <strong>Comments:</strong> {props.rack.comments}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
            <CardActions>
                <Link to={`/edit/${props.rack.id}`}><button className="button">Edit</button></Link>
                <button className= "button" type="button" onClick={() => {props.deleteThisRack(props.rack.id)}}>Delete</button>
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
