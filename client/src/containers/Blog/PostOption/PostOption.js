import React , {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Grid, Button, Typography, IconButton, Menu, MenuItem,  Dialog, DialogContent, DialogActions} from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";

import PostOptionStyles from "./PostOptionStyles"
import BlogSnackbar from "../../../components/Snackbar/BlogSnackbar";
import * as actions from "../../../store/actions/index";

class PostOption extends Component {
    state = {
        menuAnchorEl: null,
        dialogAnchorEl: false,
    }

    handleClick = event => {
        this.setState({ menuAnchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ menuAnchorEl: null });
    };

    onDialogOpenHandler = (event) => {
        this.setState({dialogAnchorEl: true})
    }

    onDialogCloseHandler = () => {
        this.setState({dialogAnchorEl: false});
    }

    onDeletePostHandler = async () => {
        console.log("test")

        await axios({method: "DELETE" , url: "/post/" + this.props.post._id , headers: {Authorization: "Bearer " + this.props.token}})
        .then(() => {
            console.log("test1")
            this.props.onDeleteHandler()
            this.props.onSnackbarOpen("Paylaşımı Sildiniz!" , "success");
            console.log("test2")
        })
        .catch((e) => {
            console.log("test3")
            this.props.onSnackbarOpen("Bu Yöneticinin Paylaşım Silme Yetkisi Bulunmamaktadır!" , "warning")
        })
    }

    render() {
        const {classes} = this.props;

        return (
            
            <React.Fragment>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick} style={{margin: "15px"}} > 
                    <MoreVertIcon />
                </IconButton>
                <Menu id="simple-menu" anchorEl={this.state.menuAnchorEl} 
                    keepMounted open={Boolean(this.state.menuAnchorEl)} onClose={this.handleClose}
                    transformOrigin={{vertical: 'top',horizontal: 'right'}} variant="selectedMenu"
                    style={{border: "1px solid #335C67"}}
                    PaperProps={{style: {borderRadius: "10px"}}}>
                    <Link className={classes.link} 
                        to={{pathname: "/blog/post-share/" + this.props.currentTabID + "/" + this.props.currentItemID, 
                        token: this.props.token, 
                        _id: this.props.post._id,
                        defaultValue: this.props.post}}>
                        <MenuItem className={[classes.button, classes.cardButton].join(" ")}>PAYLAŞIMI DÜZENLE</MenuItem>
                    </Link>
                    <MenuItem className={[classes.button, classes.cardButton].join(" ")} 
                            onClick={() => {this.onDialogOpenHandler(); this.handleClose()}}>PAYLAŞIMI SİL</MenuItem>
                    <Dialog
                        PaperProps={{style: {border: "1px solid #7E1014", backgroundColor: "#FFF3B0"}}}
                        open={this.state.dialogAnchorEl}
                        onClose={this.onDialogCloseHandler}>
                            <DialogContent>
                                <Typography className={classes.title} variant="h6">Bu paylaşımı silmek istiyor musunuz?</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Grid item xs={6} align="center">
                                    <Button className={[classes.button, classes.failButton].join(" ")} 
                                            variant="contained" 
                                            onClick={this.onDialogCloseHandler}>SILME</Button>
                                </Grid>
                                <Grid item xs={6} align="center">
                                    <Button className={[classes.button, classes.successButton].join(" ")} 
                                            variant="contained" 
                                            onClick={() => {this.onDialogCloseHandler(); this.onDeletePostHandler()}}>SIL</Button>
                                </Grid>
                            </DialogActions>
                        </Dialog>
                </Menu>

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.admin.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSnackbarOpen : (message,severity) => dispatch((actions.openSnackbar(message,severity))),
        onSnackbarClose : () => dispatch(actions.closeSnackbar())
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(PostOptionStyles(PostOption));