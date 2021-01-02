import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import CreateUserMutation from "../mutations/CreateUserMutation";
import LoginUserMutation from "../mutations/LoginUserMutation";

class Login extends Component {
    state = {
        login: true,
        username: "",
        password: "",
        fullname: ""
    };

    render() {
        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <h4>{this.state.login ? "Login" : "Sign Up"}</h4>
                <div>
                    <input
                        style={styles.inputText}
                        value={this.state.username}
                        onChange={e =>
                            this.setState({ username: e.target.value })}
                        type="text"
                        placeholder="Enter Username"
                    />
                    <input
                        style={styles.inputText}
                        value={this.state.password}
                        onChange={e =>
                            this.setState({ password: e.target.value })}
                        type="password"
                        placeholder="Enter Password"
                    />
                    {!this.state.login && (
                        <input
                            style={styles.inputText}
                            value={this.state.fullname}
                            onChange={e =>
                                this.setState({ fullname: e.target.value })}
                            type="text"
                            placeholder="Enter Full Name"
                        />
                    )}
                </div>
                <div>
                    <button
                        style={styles.inputButton}
                        onClick={() => this._confirm()}
                    >
                        {this.state.login ? "Log In" : "Sign Up"}
                    </button>
                    <button
                        style={styles.inputButton}
                        onClick={() =>
                            this.setState({ login: !this.state.login })}
                    >
                        {this.state.login
                            ? "Need to create an account?"
                            : "Already have an account?"}
                    </button>
                </div>
            </div>
        );
    }

    _confirm = () => {
        const { username, password, fullname } = this.state;
        if (this.state.login) {
            LoginUserMutation(username, password, user => {
                localStorage.setItem("User", JSON.stringify(user));
                this.props.history.push("/");
            });
        } else {
            CreateUserMutation(username, password, fullname, user => {
                localStorage.setItem("User", JSON.stringify(user));
                this.props.history.push("/");
            });
        }
    };
}

const styles = {
    inputText: {
        display: "block",
        fontSize: "20px",
        marginBottom: "10px"
    },
    inputButton: {
        display: "block",
        padding: 10,
        background: "white",
        border: "2px solid indianred",
        color: "indianred",
        borderRadius: 6,
        marginBottom: "10px"
    }
};

export default withRouter(Login);
