import React , {Component} from "react";
import {Redirect, withRouter} from "react-router-dom"
import { connect } from "react-redux";
import { Grid, Typography, Card, CardHeader , CardContent} from "@material-ui/core";
import axios from "axios";

import PostStyles from "./PostStyles";
import PostOption from "../Blog/PostOption/PostOption";
import BlogNavbar from "../../components/Blog/BlogNavbar/BlogNavbar";
import * as actions from "../../store/actions/index";

class Post extends Component {
    state = {
        post: null,
        error: false
    }

    componentDidMount() {
        const _id = this.props.match.params._id;

        const fetchData = async() => {
            await axios({method: "GET" , url:"/post/" + _id})
            .then((response) => {
                console.log(response)
                this.setState({post: response.data})
            })
            .catch((e) => {
                this.setState({error: true})
            })
        }

        fetchData();
    }

    render() {
        const {classes} = this.props;

        return (
        <React.Fragment>
            {this.state.post === null ? null :
            this.state.error ? <Redirect to="/blog" /> :
            <Grid container className={classes.grid}>
                <BlogNavbar
                    currentItemID={this.props.location.currentItemID} 
                    token={this.props.token}
                    onItemChangeHandler={(selectedItemId) => this.props.history.push({pathname: "/blog" , state: {selectedItemId}})} 
                    onLogin={this.props.onLogin} onLogout={this.props.onLogout} />

                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item xs={9}>
                                <CardHeader title={<Typography className={classes.cardTitle} variant="h5">{this.state.post.blocks[0].text}</Typography>}
                                        subheader={<Typography className={classes.cardSubtitle} variant="body2">{((new Date(this.state.post.createdAt)).toLocaleString())}</Typography>}></CardHeader>
                            </Grid>
                            {this.props.token !== null ? <Grid item xs={3} align="right">
                                <PostOption post={this.state.post} token={this.props.token} currentItemID={this.props.location.currentItemID} onDeleteHandler={() => this.props.history.push("/blog")}/>
                            </Grid> : null}
                        </Grid>
                            
                            
                            <CardContent className={classes.cardContent}>
                                {this.state.post.blocks.slice(1).map((block) => {
                                    if (block.type === "unstyled") {
                                        return <Typography className={classes.cardBody} variant="body1" paragraph key={block.key}>
                                            {block.text}
                                        </Typography>
                                    } else if (block.type === "atomic") {
                                        const data = this.state.post.entityMap[0][block.entityRanges[0].key].data;
                                        return <Grid item xs={12} align="center" key={block.key}>
                                            <img height={data.height} width={data.width} alt={data.url} src={data.url}/>
                                        </Grid>       
                                    }
                                    return null   
                                })}
                                
                            </CardContent>
                        </Card>
                </Grid>
            </Grid> }
        </React.Fragment> 
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.admin.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (username,password,closeLoginPopover) => dispatch(actions.login(username,password,closeLoginPopover)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(PostStyles(Post)));