import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link}   from 'react-router-dom';

//Mui stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import {signupUser } from '../redux/actions/userActions';

const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
          margin: '20px auto 20px auto'
      },
      pageTitle: {
          margin: '10px auto 10px auto'
      },
      textField: {
          margin: '10px auto 10px auto'
      },
      button: {
          margin: '20px auto 10px auto',
          position: 'relative'
      },
      customError: {
          color: 'red',
          fontSize: '0.8rem',
          marginTop: 10
      },
      progress: {
          position: 'absolute'
      }
}
    

export class signup extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors});
        }

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const {errors} = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.image}/>
                    <Typography variant="h2" className={classes.pageTitle}>
                        Signup
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.TextField}
                        value={this.state.email}
                        helperText={errors.email}
                        error={errors.email ? true: false} 
                        onChange={this.handleChange} 
                        fullWidth
                        />
                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.TextField}
                        value={this.state.password}
                        helperText={errors.password}
                        error={errors.password ? true: false} 
                        onChange={this.handleChange} 
                        fullWidth
                        />
                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm Password" 
                        className={classes.TextField}
                        value={this.state.confirmPassword}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true: false} 
                        onChange={this.handleChange} 
                        fullWidth
                        />
                        <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="User Name" 
                        className={classes.TextField}
                        value={this.state.handle}
                        helperText={errors.handle}
                        error={errors.handle ? true: false} 
                        onChange={this.handleChange} 
                        fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography> 
                        )}
                        <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary' 
                        className={classes.button}
                        disabled={loading}
                        >
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Already have an account? Login <Link to="/login">here.</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
